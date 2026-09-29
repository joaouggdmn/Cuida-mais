import { LuCheck } from 'react-icons/lu'
import careImage from '@/assets/images/cuida-mais-care.jpg'
import { ESSENCE_VALUES } from '../content'

export function EssenceSection() {
  return (
    <section id="sobre" className="bg-[#eef6ff] py-20 sm:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-[510px]">
          <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-[#a9d2f0]" />
          <img
            src={careImage}
            alt="Pessoa idosa caminhando e conversando com uma cuidadora em um jardim"
            className="relative aspect-[4/5] w-full rounded-[2.2rem] object-cover shadow-[0_20px_50px_rgba(84,73,50,0.2)]"
          />
          <div className="absolute -bottom-5 -right-4 rounded-2xl bg-[#2d7bbf] px-5 py-4 text-white shadow-xl sm:right-4">
            <p className="font-display text-2xl font-semibold">Com afeto,</p>
            <p className="text-sm font-semibold text-white/90">do jeito de cada um.</p>
          </div>
        </div>

        <div>
          <p className="section-kicker">NOSSA ESSÊNCIA</p>
          <h2 className="font-display mt-4 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#12395a] sm:text-5xl">
            Autonomia é continuar sendo quem se é.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#5b748b]">
            Acreditamos em um envelhecer cheio de voz, escolhas e vínculos. Por isso, o cuidado da CUIDA+
            respeita histórias, fortalece a confiança e deixa espaço para o que ainda vem pela frente.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {ESSENCE_VALUES.map((value) => (
              <li key={value} className="flex items-center gap-3 font-bold text-[#245a82]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9edff] text-[#2d614d]">
                  <LuCheck size={15} strokeWidth={3} aria-hidden="true" />
                </span>
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
