import { Link, NavLink } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useChat } from '@/features/chat/hooks/useChat'
import { getMobileNavItems } from './navigation'
import { UnreadBadge } from './UnreadBadge'

/** Faixa com o logo no topo. Só aparece abaixo de lg, onde a sidebar some. */
export function MobileTopBar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur lg:hidden">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <Link to="/inicio" className="group flex items-center gap-2.5" aria-label="CUIDA+, início">
          <Logo />
        </Link>
      </div>
    </header>
  )
}

/** Barra inferior fixa com os atalhos principais, no lugar da sidebar. */
export function MobileBottomNav() {
  const { user } = useAuth()
  const { unreadTotal } = useChat()
  const items = getMobileNavItems(user.role)

  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map(({ to, label, icon: Icon, showUnread }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `group flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-bold transition ${
                  isActive ? 'text-[#123f66]' : 'text-[#5b748b]'
                }`
              }
            >
              <span className="relative flex h-8 w-14 items-center justify-center rounded-full transition group-aria-[current=page]:bg-[#e5f3ff]">
                <Icon size={22} aria-hidden="true" />
                {showUnread && <UnreadBadge count={unreadTotal} className="absolute -right-0.5 -top-1.5" />}
              </span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
