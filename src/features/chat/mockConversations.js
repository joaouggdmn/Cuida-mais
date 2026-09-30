// Conversas fictícias usadas como ponto de partida de cada usuário, só para testes visuais.
// `minutesAgo` vira data real na hora de semear, para as conversas parecerem recentes.
const SEED = [
  {
    caregiverId: 'maria',
    unread: 2,
    messages: [
      { from: 'me', text: 'Oi, Maria! Gostaria de combinar um atendimento para esta semana.', minutesAgo: 70 },
      { from: 'caregiver', text: 'Olá! Claro, tenho horários livres na segunda e na quarta.', minutesAgo: 25 },
      { from: 'caregiver', text: 'Posso levar alguns jogos de memória, se ela gostar.', minutesAgo: 12 },
    ],
  },
  {
    caregiverId: 'ana',
    unread: 1,
    messages: [
      { from: 'me', text: 'Ana, a senhora atende quem tem diabetes?', minutesAgo: 190 },
      { from: 'caregiver', text: 'Atendo, sim. Acompanho a glicemia e os horários da medicação.', minutesAgo: 120 },
    ],
  },
  {
    caregiverId: 'joao',
    unread: 0,
    messages: [
      { from: 'caregiver', text: 'Bom dia! Sou o João, técnico em enfermagem. Qualquer dúvida, é só chamar.', minutesAgo: 1560 },
      { from: 'me', text: 'Obrigado, João! Vou ver a agenda e te aviso.', minutesAgo: 1500 },
    ],
  },
  {
    caregiverId: 'lucia',
    unread: 0,
    messages: [
      { from: 'me', text: 'Lúcia, vocês fazem passeios na praça?', minutesAgo: 4400 },
      { from: 'caregiver', text: 'Fazemos! Quando o tempo ajuda, é o momento preferido de muitos.', minutesAgo: 4320 },
    ],
  },
]

export const CAREGIVER_AUTO_REPLIES = [
  'Recebi sua mensagem. Vou acompanhar tudo com carinho.',
  'Combinado! Qualquer mudança, me avise por aqui.',
  'Perfeito, anotei aqui. Obrigada pela confiança.',
]

export function buildInitialConversations(now = Date.now()) {
  return SEED.map(({ caregiverId, unread, messages }) => ({
    caregiverId,
    unread,
    messages: messages.map(({ from, text, minutesAgo }, index) => ({
      id: `${caregiverId}-${index}`,
      from,
      text,
      sentAt: new Date(now - minutesAgo * 60_000).toISOString(),
    })),
  }))
}
