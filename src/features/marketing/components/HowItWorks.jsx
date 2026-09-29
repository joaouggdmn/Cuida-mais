import { LuArrowRight } from 'react-icons/lu'
import { HOW_IT_WORKS_STEPS } from '../content'

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-[#123f66] py-20 text-[#ffffff] sm:py-28">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="section-kicker">SEM COMPLICAÇÃO</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">
              Um cuidado que começa pela escuta.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#d7e7f5]">
              Você não precisa ter todas as respostas agora. A gente caminha junto, uma escolha de cada vez.
            </p>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-2 font-extrabold text-[#b9d9f3] transition hover:text-white"
            >
              Falar com uma pessoa
              <LuArrowRight size={18} aria-hidden="true" />
            </a>
          </div>

          <ol className="grid gap-4 sm:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <li key={step} className="rounded-[1.5rem] border bg-white/[0.07] p-6 backdrop-blur-sm">
                <span className="font-display text-4xl font-semibold text-[#b9d9f3]">0{index + 1}</span>
                <p className="mt-10 text-lg font-bold leading-snug text-white">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
