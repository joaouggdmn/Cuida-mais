import { LuCheck, LuLifeBuoy } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { formatPrice, PLANS } from '../plans'

export function PlansPage() {
  const subscribe = (plan) => {
    toast.info(`Plano ${plan.name} em breve`, {
      description: 'A assinatura ainda está sendo preparada. Avisaremos quando estiver disponível.',
    })
  }

  return (
    <>
      <PageHeader
        kicker="PLANOS"
        title="Escolha o seu plano"
        description="Você ainda não tem um plano. Veja qual combina melhor com a rotina de cuidado da sua família."
      />

      <ul className="mt-10 grid gap-6 md:grid-cols-3 md:items-stretch">
        {PLANS.map((plan) => {
          const dark = plan.highlighted
          return (
            <li
              key={plan.id}
              className={`relative flex flex-col rounded-[1.8rem] border p-7 ${
                dark
                  ? 'border-[#123f66] bg-[#123f66] text-white shadow-[0_24px_50px_rgba(18,63,102,0.28)] md:-my-3 md:py-10'
                  : 'bg-white shadow-[0_9px_30px_rgba(24,57,90,0.06)]'
              }`}
            >
              {dark && (
                <span className="absolute -top-3.5 left-7 rounded-full bg-[#2d7bbf] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.1em] text-white">
                  Mais escolhido
                </span>
              )}
              <h2 className={`font-display text-3xl font-semibold tracking-[-0.03em] ${dark ? '' : 'text-[#12395a]'}`}>
                {plan.name}
              </h2>
              <p className={`mt-2 ${dark ? 'text-[#d7e7f5]' : 'text-[#5b748b]'}`}>{plan.tagline}</p>

              <p className="mt-6 flex items-baseline gap-1">
                <span className={`font-display text-5xl font-semibold tracking-[-0.04em] ${dark ? '' : 'text-[#12395a]'}`}>
                  {formatPrice(plan.price)}
                </span>
                <span className={`font-bold ${dark ? 'text-[#b9d9f3]' : 'text-[#5b748b]'}`}>/mês</span>
              </p>

              <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 ${dark ? 'border-white/15' : ''}`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        dark ? 'bg-white/15 text-[#b9d9f3]' : 'bg-[#e5f3ff] text-[#1f5e8d]'
                      }`}
                    >
                      <LuCheck size={15} aria-hidden="true" />
                    </span>
                    <span className={dark ? 'text-[#eef6fd]' : 'text-[#34566f]'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => subscribe(plan)}
                className={`mt-8 min-h-12 rounded-full px-6 font-extrabold transition active:scale-[0.98] ${
                  dark
                    ? 'bg-white text-[#123f66] hover:bg-[#e5f3ff]'
                    : 'border bg-white text-[#1f5e8d] hover:border-[#2d7bbf] hover:bg-[#e5f3ff]'
                }`}
              >
                Assinar o {plan.name}
              </button>
            </li>
          )
        })}
      </ul>

      <p className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-[#5b748b]">
        <LuLifeBuoy size={18} className="text-[#2d7bbf]" aria-hidden="true" />
        Ficou em dúvida sobre qual escolher?
        <Link to="/suporte" className="font-extrabold text-[#2d7bbf] underline-offset-4 hover:underline">
          Fale com a gente
        </Link>
      </p>
    </>
  )
}
