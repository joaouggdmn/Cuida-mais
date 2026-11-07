// Função serverless da Vercel: recebe a conversa do suporte e pede a resposta ao Gemini.
// A chave fica só aqui (variável de ambiente GEMINI_API_KEY) e nunca chega ao navegador.
import { ALLOWED_ROLES, buildSystemPrompt } from './_lib/supportKnowledge.js'

// Modelo fixo em vez do apelido gemini-flash-latest: o apelido aponta para o Flash mais novo,
// que costuma ficar sobrecarregado no plano grátis logo depois do lançamento.
const DEFAULT_MODEL = 'gemini-3.6-flash'
const FALLBACK_MODEL = 'gemini-flash-lite-latest'
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models'
const PRIMARY_TIMEOUT_MS = 15_000
const FALLBACK_TIMEOUT_MS = 10_000
// Sem cota (429), sobrecarga (500/503) ou demora (504): vale tentar o modelo reserva.
const RETRYABLE_STATUS = new Set([429, 500, 503, 504])

const MAX_HISTORY = 12
const MAX_MESSAGE_LENGTH = 800

// Limite simples por IP. Cada instância da função tem a própria contagem,
// então é só uma proteção básica contra abuso, não um limite exato.
const RATE_LIMIT = 8
const RATE_WINDOW_MS = 60_000
const hitsByIp = new Map()

const MESSAGES = {
  forbidden: 'Origem não permitida.',
  invalid: 'Mensagem inválida.',
  tooLong: `Escreva uma mensagem de até ${MAX_MESSAGE_LENGTH} caracteres.`,
  rateLimited: 'Muitas mensagens em pouco tempo. Aguarde um minuto e tente de novo.',
  busy: 'O assistente está com muitos atendimentos agora. Tente de novo em alguns minutos.',
  unavailable: 'O assistente virtual está indisponível no momento.',
}

const json = (status, body) => Response.json(body, { status })

function isSameOrigin(request) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? new URL(request.url).host
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (hitsByIp.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) {
    hitsByIp.set(ip, recent)
    return true
  }
  recent.push(now)
  hitsByIp.set(ip, recent)
  // Evita que o mapa cresça sem limite numa instância que fica muito tempo de pé.
  if (hitsByIp.size > 5000) hitsByIp.clear()
  return false
}

/** Valida o corpo e devolve as mensagens no formato do Gemini, ou uma string de erro. */
function parseConversation(body) {
  const messages = body?.messages
  if (!Array.isArray(messages) || messages.length === 0) return MESSAGES.invalid

  const recent = messages.slice(-MAX_HISTORY)
  for (const message of recent) {
    if (!message || (message.from !== 'me' && message.from !== 'assistant')) return MESSAGES.invalid
    if (typeof message.text !== 'string' || !message.text.trim()) return MESSAGES.invalid
    if (message.text.length > MAX_MESSAGE_LENGTH) return MESSAGES.tooLong
  }
  if (recent.at(-1).from !== 'me') return MESSAGES.invalid

  // O Gemini espera que a conversa comece pelo usuário e alterne os papéis.
  // Mensagens seguidas do mesmo lado (ex.: uma pergunta que ficou sem resposta por erro) viram um turno só.
  const firstUser = recent.findIndex((message) => message.from === 'me')
  const contents = []
  for (const message of recent.slice(firstUser)) {
    const role = message.from === 'me' ? 'user' : 'model'
    const part = { text: message.text.trim() }
    const last = contents.at(-1)
    if (last?.role === role) last.parts.push(part)
    else contents.push({ role, parts: [part] })
  }
  return contents
}

function extractReply(data) {
  const parts = data?.candidates?.[0]?.content?.parts ?? []
  return parts
    .filter((part) => typeof part.text === 'string' && !part.thought)
    .map((part) => part.text)
    .join('')
    .trim()
}

export async function POST(request) {
  if (!isSameOrigin(request)) return json(403, { error: MESSAGES.forbidden })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('[api/chat] GEMINI_API_KEY não configurada.')
    return json(500, { error: MESSAGES.unavailable })
  }

  if (isRateLimited(getClientIp(request))) return json(429, { error: MESSAGES.rateLimited })

  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { error: MESSAGES.invalid })
  }

  const contents = parseConversation(body)
  if (typeof contents === 'string') return json(400, { error: contents })

  const role = ALLOWED_ROLES.includes(body.role) ? body.role : null
  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: buildSystemPrompt(role) }] },
    contents,
    // Limite folgado: nos modelos que "pensam", o raciocínio também conta tokens.
    generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
  })

  // Modelo principal e, se ele estiver sobrecarregado, lento ou sem cota grátis, o reserva.
  const models = [...new Set([process.env.GEMINI_MODEL || DEFAULT_MODEL, FALLBACK_MODEL])]
  let busy = false
  for (const [index, model] of models.entries()) {
    const result = await callGemini(model, apiKey, payload, index === 0 ? PRIMARY_TIMEOUT_MS : FALLBACK_TIMEOUT_MS)
    if (result.reply) return json(200, { reply: result.reply })
    if (!result.retry) break
    busy ||= result.status === 429
  }

  return busy ? json(429, { error: MESSAGES.busy }) : json(502, { error: MESSAGES.unavailable })
}

/** Uma tentativa num modelo. `retry` indica erro passageiro, em que vale tentar o próximo modelo. */
async function callGemini(model, apiKey, payload, timeoutMs) {
  let response
  try {
    response = await fetch(`${GEMINI_URL}/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: payload,
      signal: AbortSignal.timeout(timeoutMs),
    })
  } catch (error) {
    console.error(`[api/chat] ${model}: sem resposta (${error.name}).`)
    return { retry: true }
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    console.error(`[api/chat] ${model} respondeu ${response.status}:`, detail.slice(0, 300))
    return { status: response.status, retry: RETRYABLE_STATUS.has(response.status) }
  }

  const reply = extractReply(await response.json().catch(() => null))
  if (!reply) console.error(`[api/chat] ${model}: resposta vazia ou bloqueada.`)
  return { reply, retry: !reply }
}
