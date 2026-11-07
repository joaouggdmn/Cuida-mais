import { LuHeartHandshake, LuHouse, LuSparkles } from 'react-icons/lu'

export const NAV_LINKS = [
  { label: 'Minha área', href: '#area' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Cuidados', href: '#servicos' },
  { label: 'Sobre nós', href: '#sobre' },
]

export const MOBILE_NAV_LINKS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Cuidados', href: '#servicos' },
  { label: 'Sobre nós', href: '#sobre' },
]

// Cidades e FAQ ficam em publicInfo.js (sem dependências) porque a IA do suporte também os lê.
export { CITIES, FAQ_ITEMS } from './publicInfo'

export const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export const SERVICE_CATEGORIES = [
  {
    icon: LuHeartHandshake,
    title: 'Companhia que faz bem',
    description: 'Presença, conversa e passeios para que cada dia tenha mais leveza e conexão.',
  },
  {
    icon: LuHouse,
    title: 'Apoio na rotina',
    description: 'Ajuda prática e respeitosa para tornar a vida em casa mais confortável e segura.',
  },
  {
    icon: LuSparkles,
    title: 'Bem-estar sob medida',
    description: 'Uma rotina pensada a partir de hábitos, preferências e do que traz alegria.',
  },
]

export const HOW_IT_WORKS_STEPS = [
  'Você nos conta o que importa',
  'Conhecemos a rotina e as preferências',
  'Criamos um cuidado possível, com afeto',
]

export const ESSENCE_VALUES = [
  'Escuta sem pressa',
  'Rotinas com significado',
  'Parceria com a família',
  'Presença com respeito',
]

// `color` guarda as classes Tailwind do avatar com as iniciais.
export const CAREGIVERS = [
  {
    id: 'maria',
    name: 'Maria Silva',
    role: 'Cuidadora de idosos',
    rating: '4,9',
    reviews: 42,
    available: 'Disponível hoje',
    initials: 'MS',
    color: 'bg-[#dff1ff] text-[#1f5e8d]',
  },
  {
    id: 'joao',
    name: 'João Fernandes',
    role: 'Técnico em enfermagem',
    rating: '4,8',
    reviews: 31,
    available: 'Disponível amanhã',
    initials: 'JF',
    color: 'bg-[#e8f5ff] text-[#245a82]',
  },
  {
    id: 'ana',
    name: 'Ana Costa',
    role: 'Especialista em geriatria',
    rating: '5,0',
    reviews: 18,
    available: 'Disponível hoje',
    initials: 'AC',
    color: 'bg-[#d9edff] text-[#173f62]',
  },
]

export const INITIAL_CHAT_MESSAGES = [
  { from: 'caregiver', text: 'Olá! Sou a Maria. Como posso ajudar vocês hoje?' },
  { from: 'family', text: 'Oi, Maria! Gostaria de confirmar o atendimento para minha mãe.' },
]

export const CAREGIVER_AUTO_REPLY = 'Recebi sua mensagem. Vou acompanhar tudo com carinho.'
