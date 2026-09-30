import { LuChevronDown, LuClock3, LuHeadset } from 'react-icons/lu'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { ContactButtons } from '../components/ContactButtons'
import { SUPPORT_CONTACT, SUPPORT_FAQ } from '../content'

export function SupportPage() {
  return (
    <>
      <PageHeader
        kicker="SUPORTE"
        title="Como podemos ajudar?"
        description="Veja as dúvidas mais comuns ou fale direto com a equipe CUIDA+."
      />

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <Card aria-labelledby="duvidas-comuns" className="sm:p-8">
          <p className="section-kicker">DÚVIDAS COMUNS</p>
          <h2 id="duvidas-comuns" className="font-display mt-2 text-2xl font-semibold text-[#12395a]">
            Perguntas frequentes
          </h2>
          <div className="mt-4 divide-y border-y">
            {SUPPORT_FAQ.map(({ question, answer }) => (
              <details key={question} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-lg font-extrabold text-[#173f62] marker:content-none [&::-webkit-details-marker]:hidden">
                  {question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e5f3ff] text-[#1f5e8d] transition group-open:rotate-180">
                    <LuChevronDown size={18} aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-2xl pt-3 leading-relaxed text-[#4d6980]">{answer}</p>
              </details>
            ))}
          </div>
        </Card>

        <Card aria-labelledby="fale-conosco" className="lg:sticky lg:top-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f3ff] text-[#1f5e8d]">
            <LuHeadset size={24} aria-hidden="true" />
          </span>
          <h2 id="fale-conosco" className="font-display mt-5 text-2xl font-semibold text-[#12395a]">
            Fale com a gente
          </h2>
          <p className="mt-2 leading-relaxed text-[#5b748b]">Uma pessoa da equipe CUIDA+ vai te atender com calma.</p>
          <ContactButtons stacked className="mt-6" />
          <p className="mt-5 flex items-start gap-2 text-sm text-[#5b748b]">
            <LuClock3 size={17} className="mt-0.5 shrink-0 text-[#2d7bbf]" aria-hidden="true" />
            {SUPPORT_CONTACT.hours}
          </p>
        </Card>
      </div>
    </>
  )
}
