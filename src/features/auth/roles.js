import { LuHeartHandshake, LuUserRound, LuUsers } from 'react-icons/lu'

export const ROLES = [
  {
    value: 'elder',
    name: 'Idoso',
    label: 'Sou idoso',
    description: 'Quero escolher como ser apoiado no meu dia a dia.',
    icon: LuUserRound,
  },
  {
    value: 'family',
    name: 'Familiar',
    label: 'Sou familiar',
    description: 'Quero encontrar e acompanhar o cuidado de quem eu amo.',
    icon: LuUsers,
  },
  {
    value: 'caregiver',
    name: 'Cuidador',
    label: 'Sou cuidador',
    description: 'Quero oferecer meu trabalho e receber solicitações.',
    icon: LuHeartHandshake,
  },
]
