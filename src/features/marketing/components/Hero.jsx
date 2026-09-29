import { LuArrowRight, LuChevronDown, LuHeartHandshake, LuShieldCheck } from 'react-icons/lu'
import heroImage from '@/assets/images/cuida-mais-hero.jpg'

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-[#eaf5ff]">
      <div className="absolute inset-0 opacity-[0.3] [background-image:radial-gradient(#a8cce8_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container relative grid min-h-[690px] items-center gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="relative z-10 max-w-2xl motion-safe:animate-fade-up">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border bg-[#f7fbff] px-4 py-2 text-xs font-extrabold tracking-[0.1em] text-[#1f5e8d] sm:text-sm">
            <LuHeartHandshake size={16} aria-hidden="true" />
            A VIDA CONTINUA CHEIA DE POSSIBILIDADES
          </p>
          <h1 className="font-display text-[2.85rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[#12395a] sm:text-6xl lg:text-7xl">
            Cuidar é estar perto de quem faz a vida valer mais.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#4d6980] sm:text-xl">
            Na CUIDA+, conectamos carinho, segurança e profissionais qualificados para o cuidado de quem
            você ama.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contato"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#123f66] px-7 text-base font-extrabold text-white shadow-[0_12px_28px_rgba(31,76,62,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0d2f4f] active:scale-[0.97]"
            >
              Quero conversar
              <LuArrowRight size={19} aria-hidden="true" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border bg-[#ffffff] px-7 text-base font-extrabold text-[#1f5e8d] transition"
            >
              Conheça nosso jeito
              <LuChevronDown size={18} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm font-bold text-[#496b86]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d7ecff] text-[#1f5e8d]">
              <LuShieldCheck size={19} aria-hidden="true" />
            </span>
            <span>Relações baseadas em respeito, escuta e confiança.</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[660px] motion-safe:animate-fade-up [animation-delay:110ms]">
          <div className="absolute -right-12 -top-8 h-44 w-44 rounded-full border-[18px] opacity-70" />
          <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[#2d7bbf] opacity-85" />
          <div className="relative overflow-hidden rounded-[2.2rem] border-[10px] shadow-[0_24px_70px_rgba(42,73,57,0.24)] sm:rounded-[3.2rem]">
            <img
              src={heroImage}
              alt="Mulher idosa sorrindo em uma conversa acolhedora com sua filha em casa"
              className="aspect-[16/11] h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-5 max-w-[255px] rounded-2xl bg-[#ffffff] p-4 shadow-[0_16px_32px_rgba(39,59,46,0.18)] sm:-left-8 sm:p-5">
            <p className="font-display text-2xl font-semibold tracking-tight text-[#173f62]">Mais presença.</p>
            <p className="mt-1 text-sm font-medium leading-snug text-[#5b748b]">
              Mais momentos que ficam na memória.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
