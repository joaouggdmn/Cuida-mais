import { LuArrowDown, LuChevronDown } from 'react-icons/lu'
import { SupportChat } from '@/features/support/components/SupportChat'
import { FAQ_ITEMS } from '../content'

const VISITOR_WELCOME =
  'Olá! Sou o assistente virtual do CUIDA+. Posso explicar como a plataforma funciona, as cidades que atendemos e os planos. Pode perguntar do seu jeito.'
const VISITOR_SUGGESTIONS = ['Como o CUIDA+ funciona?', 'Quais cidades vocês atendem?', 'Quanto custa?']

export function Faq() {
  return (
    <section id="duvidas" className="bg-[#ffffff] py-20 sm:py-28">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <p className="section-kicker">DÚVIDAS COMUNS</p>
          <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#12395a] sm:text-5xl">
            Pode perguntar. Estamos aqui.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#5b748b]">
            Uma conversa tranquila pode ser o primeiro passo para fazer escolhas melhores. Veja as dúvidas mais comuns
            ou pergunte ao nosso assistente virtual, a qualquer hora.
          </p>

          <div className="mt-10 divide-y border-y">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-extrabold text-[#173f62] marker:content-none [&::-webkit-details-marker]:hidden">
                  {question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e5f3ff] text-[#2c5a49] transition group-open:rotate-180">
                    <LuChevronDown size={18} aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-2xl pt-4 leading-relaxed text-[#5e7066]">{answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <SupportChat
            className="h-[32rem]"
            welcome={VISITOR_WELCOME}
            suggestions={VISITOR_SUGGESTIONS}
            humanContactHref="#contato"
          />
          <a
            href="#contato"
            className="mt-4 inline-flex min-h-11 items-center gap-2 px-1 text-sm font-bold text-[#5b748b] transition hover:text-[#1f5e8d]"
          >
            Prefere falar com uma pessoa? Nossa equipe atende logo abaixo.
            <LuArrowDown size={16} className="shrink-0 text-[#2d7bbf]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
