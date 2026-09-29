import { LuArrowLeft } from 'react-icons/lu'
import { Link, Outlet } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'

export function AuthLayout() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#eaf5ff] text-[#18324a]">
      <div className="absolute inset-0 -z-10 opacity-[0.3] [background-image:radial-gradient(#a8cce8_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute -right-16 -top-16 -z-10 h-72 w-72 rounded-full border-[36px] opacity-70" />
      <div className="absolute -bottom-20 -left-20 -z-10 h-56 w-56 rounded-full bg-[#2d7bbf] opacity-15" />

      <div className="container flex min-h-screen flex-col py-6">
        <header className="flex items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="CUIDA+, início">
            <Logo />
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-bold text-[#1f5e8d] transition hover:bg-white"
          >
            <LuArrowLeft size={18} aria-hidden="true" />
            Voltar ao início
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
