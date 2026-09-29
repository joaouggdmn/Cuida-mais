import { LuLogOut } from 'react-icons/lu'
import { Link, NavLink } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { getRole } from '@/features/auth/roles'
import { useChat } from '@/features/chat/hooks/useChat'
import { getFirstName, getInitials } from '@/utils/name'
import { getNavItems } from './navigation'
import { UnreadBadge } from './UnreadBadge'

const linkClassName = ({ isActive }) =>
  `flex min-h-12 items-center gap-3 rounded-2xl px-4 text-base font-bold transition ${
    isActive ? 'bg-[#e5f3ff] text-[#123f66]' : 'text-[#426684] hover:bg-[#f1f7fc] hover:text-[#123f66]'
  }`

export function Sidebar() {
  const { user } = useAuth()
  const { unreadTotal } = useChat()
  const logout = useLogout()
  const role = getRole(user.role)

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[272px] flex-col border-r bg-white px-5 py-6 lg:flex">
      <Link to="/inicio" className="group flex items-center gap-2.5 px-2" aria-label="CUIDA+, início">
        <Logo />
      </Link>

      <nav aria-label="Principal" className="mt-10 flex-1">
        <ul className="space-y-1.5">
          {getNavItems(user.role).map(({ to, label, icon: Icon, showUnread }) => (
            <li key={to}>
              <NavLink to={to} className={linkClassName}>
                <Icon size={21} aria-hidden="true" />
                {label}
                {showUnread && <UnreadBadge count={unreadTotal} className="ml-auto" />}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t pt-5">
        <NavLink
          to="/conta"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl p-3 transition ${isActive ? 'bg-[#e5f3ff]' : 'hover:bg-[#f1f7fc]'}`
          }
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#123f66] font-bold text-[#b9d9f3]">
            {getInitials(user.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-extrabold text-[#173f62]">{getFirstName(user.name)}</span>
            <span className="block text-sm text-[#5b748b]">{role?.name} · Minha conta</span>
          </span>
        </NavLink>
        <button
          type="button"
          onClick={logout}
          className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-full border bg-white px-5 text-sm font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
        >
          <LuLogOut size={17} aria-hidden="true" />
          Sair
        </button>
      </div>
    </aside>
  )
}
