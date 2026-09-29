import { LuLogOut } from 'react-icons/lu'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Logo } from '@/components/ui/Logo'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getFirstName } from '@/utils/name'

export function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    // Sai da rota protegida (renderizando já, com flushSync) antes de limpar a sessão;
    // senão o ProtectedRoute ainda montado redirecionaria para /login.
    await navigate('/', { flushSync: true })
    logout()
    toast.success('Você saiu da sua conta.', { description: 'Até logo!' })
  }

  return (
    <div className="min-h-screen bg-[#f7fbff] text-[#18324a]">
      <header className="border-b bg-white">
        <div className="container flex h-[76px] items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="CUIDA+, início">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-base font-bold text-[#426684] sm:inline">Olá, {getFirstName(user.name)}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border bg-white px-5 text-sm font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
            >
              <LuLogOut size={17} aria-hidden="true" />
              Sair
            </button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
