import { useState } from 'react'
import { LuArrowRight, LuMenu, LuX } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Logo } from '@/components/ui/Logo'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { MOBILE_NAV_LINKS, NAV_LINKS } from '../content'

const primaryActionClassName =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#2d7bbf] px-5 py-3 text-sm font-extrabold text-white shadow-[0_8px_22px_rgba(216,98,64,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#236596] active:scale-[0.97]'
const secondaryActionClassName =
  'inline-flex items-center justify-center gap-2 rounded-full border bg-white px-5 py-3 text-sm font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    toast.success('Você saiu da sua conta.', { description: 'Até logo!' })
  }

  const closeMenu = () => setMenuOpen(false)

  const actions = user ? (
    <>
      <button type="button" onClick={handleLogout} className={secondaryActionClassName}>
        Sair
      </button>
      <Link to="/inicio" onClick={closeMenu} className={primaryActionClassName}>
        Minha conta
        <LuArrowRight size={17} aria-hidden="true" />
      </Link>
    </>
  ) : (
    <>
      <Link to="/login" onClick={closeMenu} className={secondaryActionClassName}>
        Entrar
      </Link>
      <Link to="/cadastro" onClick={closeMenu} className={primaryActionClassName}>
        Criar conta
        <LuArrowRight size={17} aria-hidden="true" />
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-40 border-b bg-[#ffffff]/95 backdrop-blur-xl">
      <div className="container flex h-[76px] items-center justify-between">
        <a href="#inicio" className="group flex items-center gap-2.5" aria-label="CUIDA+, início">
          <Logo />
        </a>

        <nav
          className="hidden items-center gap-7 text-sm font-bold text-[#426684] lg:flex"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} className="nav-link" href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">{actions}</div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-full p-2.5 text-[#1e4a3c] transition hover:bg-[#f0ece4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e4a3c] lg:hidden"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <LuX size={24} aria-hidden="true" /> : <LuMenu size={24} aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t bg-[#ffffff] px-4 pb-5 pt-3 shadow-xl lg:hidden">
          <nav className="mx-auto flex max-w-xl flex-col gap-1" aria-label="Navegação móvel">
            {MOBILE_NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-base font-bold text-[#245a82] transition hover:bg-[#f1ece4]"
              >
                {label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t pt-4 *:min-h-12 *:text-base">{actions}</div>
          </nav>
        </div>
      )}
    </header>
  )
}
