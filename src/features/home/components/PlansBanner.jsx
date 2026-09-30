import { LuArrowRight, LuSparkles } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { formatPrice, LOWEST_PRICE, PLANS } from '@/features/subscription/plans'

export function PlansBanner() {
  return (
    <section
      aria-labelledby="convite-planos"
      className="relative isolate overflow-hidden rounded-[1.6rem] border bg-[#e5f3ff] p-7 sm:p-8"
    >
      <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full border-[28px] border-white/70" />
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2d7bbf]">
        <LuSparkles size={24} aria-hidden="true" />
      </span>
      <h2 id="convite-planos" className="font-display mt-5 text-3xl font-semibold tracking-[-0.035em] text-[#12395a]">
        Você ainda não tem um plano.
      </h2>
      <p className="mt-2 max-w-md leading-relaxed text-[#4d6980]">
        São {PLANS.length} opções para organizar os cuidados do mês, a partir de{' '}
        <strong className="text-[#12395a]">{formatPrice(LOWEST_PRICE)}/mês</strong>.
      </p>
      <Link
        to="/planos"
        className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#2d7bbf] px-6 font-extrabold text-white transition hover:bg-[#236596] active:scale-[0.98]"
      >
        Conhecer os planos
        <LuArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  )
}
