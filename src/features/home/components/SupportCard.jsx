import { LuArrowRight, LuLifeBuoy } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { ContactButtons } from '@/features/support/components/ContactButtons'
import { SUPPORT_CONTACT } from '@/features/support/content'

export function SupportCard() {
  return (
    <Card aria-labelledby="precisa-de-ajuda" className="flex flex-col">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f3ff] text-[#1f5e8d]">
          <LuLifeBuoy size={24} aria-hidden="true" />
        </span>
        <div>
          <p className="section-kicker">SUPORTE</p>
          <h2 id="precisa-de-ajuda" className="font-display mt-1.5 text-2xl font-semibold text-[#12395a]">
            Precisa de ajuda?
          </h2>
        </div>
      </div>
      <p className="mt-4 text-sm text-[#5b748b]">{SUPPORT_CONTACT.hours}</p>
      <ContactButtons stacked className="mt-5" />
      <Link
        to="/suporte"
        className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-4 font-extrabold text-[#2d7bbf] underline-offset-4 hover:underline"
      >
        Perguntas frequentes
        <LuArrowRight size={17} aria-hidden="true" />
      </Link>
    </Card>
  )
}
