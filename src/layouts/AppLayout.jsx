import { Outlet } from 'react-router-dom'
import { ChatProvider } from '@/contexts/ChatContext'
import { MobileBottomNav, MobileTopBar } from './app/MobileNav'
import { Sidebar } from './app/Sidebar'

/** Área logada: sidebar fixa à esquerda no desktop, barra inferior no celular. */
export function AppLayout() {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-[#f7fbff] text-[#18324a]">
        <Sidebar />
        <MobileTopBar />
        <main className="pb-24 lg:pb-0 lg:pl-[272px]">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
            <Outlet />
          </div>
        </main>
        <MobileBottomNav />
      </div>
    </ChatProvider>
  )
}
