import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SiteFooter } from '@/features/marketing/components/SiteFooter'
import { SiteHeader } from '@/features/marketing/components/SiteHeader'
import { TopBar } from '@/features/marketing/components/TopBar'

export function MarketingLayout() {
  const [largeText, setLargeText] = useState(false)

  return (
    <div
      className={`min-h-screen overflow-x-hidden bg-[#ffffff] text-[#18324a] ${largeText ? 'text-[1.08rem]' : ''}`}
    >
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-md bg-[#0d2f4f] px-5 py-3 font-bold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <TopBar largeText={largeText} onToggleLargeText={() => setLargeText((current) => !current)} />
      <SiteHeader />
      <main id="conteudo">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
