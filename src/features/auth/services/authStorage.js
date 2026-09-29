import { getCollection, getItem, removeItem, setCollection, setItem } from '@/lib/storage/storage'
import { onlyDigits } from '@/utils/cpf'

const USERS = 'users'
const SESSION = 'session'

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password)
  const digest = await window.crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function toPublicUser({ passwordHash: _passwordHash, ...user }) {
  return user
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

/** Erro de negócio com o campo do formulário a que se refere (ou null). */
export class AuthError extends Error {
  constructor(message, field = null) {
    super(message)
    this.field = field
  }
}

export async function registerUser({ name, email, password, cpf, role }) {
  const users = getCollection(USERS)
  const normalizedEmail = normalizeEmail(email)
  const cpfDigits = onlyDigits(cpf)

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new AuthError('Já existe uma conta com este e-mail.', 'email')
  }
  if (users.some((user) => user.cpf === cpfDigits)) {
    throw new AuthError('Já existe uma conta com este CPF.', 'cpf')
  }

  const user = {
    id: window.crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    cpf: cpfDigits,
    role,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  }
  setCollection(USERS, [...users, user])
  setItem(SESSION, { userId: user.id })
  return toPublicUser(user)
}

export async function loginUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email)
  const user = getCollection(USERS).find((candidate) => candidate.email === normalizedEmail)
  if (!user || user.passwordHash !== (await hashPassword(password))) {
    throw new AuthError('E-mail ou senha incorretos.')
  }
  setItem(SESSION, { userId: user.id })
  return toPublicUser(user)
}

export function logoutUser() {
  removeItem(SESSION)
}

export function getSessionUser() {
  const session = getItem(SESSION)
  if (!session?.userId) return null
  const user = getCollection(USERS).find((candidate) => candidate.id === session.userId)
  return user ? toPublicUser(user) : null
}
