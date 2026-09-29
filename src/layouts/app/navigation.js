import { LuCalendarDays, LuHouse, LuLifeBuoy, LuMessageCircle, LuSparkles, LuUserRound } from 'react-icons/lu'
import { CARE_SEEKER_ROLES } from '@/features/auth/roles'

// `roles` ausente = todos os perfis. `showUnread` mostra o total de mensagens não lidas.
// `mobile: false` tira o item da barra inferior (a barra só cabe 5 itens).
const NAV_ITEMS = [
  { to: '/inicio', label: 'Início', icon: LuHouse },
  { to: '/agenda', label: 'Agenda', icon: LuCalendarDays, roles: CARE_SEEKER_ROLES },
  { to: '/chat', label: 'Chat', icon: LuMessageCircle, roles: CARE_SEEKER_ROLES, showUnread: true },
  { to: '/planos', label: 'Planos', icon: LuSparkles, roles: CARE_SEEKER_ROLES, mobile: false },
  { to: '/suporte', label: 'Suporte', icon: LuLifeBuoy },
]

export const ACCOUNT_ITEM = { to: '/conta', label: 'Conta', icon: LuUserRound }

export function getNavItems(role) {
  return NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role))
}

export function getMobileNavItems(role) {
  return [...getNavItems(role).filter((item) => item.mobile !== false), ACCOUNT_ITEM]
}
