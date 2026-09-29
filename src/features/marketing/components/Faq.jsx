import { LuChevronDown } from 'react-icons/lu'
import { FAQ_ITEMS } from '../content'

export function Faq() {
  return (
    <section className="bg-[#ffffff] py-20 sm:py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker">DÚVIDAS COMUNS</p>
          <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#12395a] sm:text-5xl">
            Pode perguntar. Estamos aqui.
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-[#5b748b]">
            Uma conversa tranquila pode ser o primeiro passo para fazer escolhas melhores.
          </p>
        </div>

        <div className="divide-y border-y">
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
    </section>
  )
}
