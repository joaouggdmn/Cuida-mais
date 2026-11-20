import { LuCheck, LuClock, LuHeartHandshake, LuInfo, LuLifeBuoy, LuMoon, LuStethoscope, LuSun } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { formatPlanPrice, PLAN_GROUPS, PLANS, PRICE_NOTE } from '../plans'

const PLAN_ICONS = {
  essencial: LuHeartHandshake,
  'cuidado-diario': LuSun,
  presenca: LuMoon,
  integral: LuClock,
  multidisciplinar: LuStethoscope,
}

// Classes completas (sem montar strings) para o Tailwind encontrar cada cor.
const ACCENTS = {
  sky: {
    card: 'bg-white shadow-[0_9px_30px_rgba(24,57,90,0.06)]',
    band: 'bg-[#2d7bbf]',
    icon: 'bg-[#e5f3ff] text-[#1f5e8d]',
  },
  amber: {
    card: 'bg-white shadow-[0_9px_30px_rgba(24,57,90,0.06)]',
    band: 'bg-[#e0a23b]',
    icon: 'bg-[#fff3d9] text-[#a3640c]',
  },
  indigo: {
    card: 'bg-white shadow-[0_9px_30px_rgba(24,57,90,0.06)]',
    band: 'bg-[#5b5fc7]',
    icon: 'bg-[#ecebfb] text-[#4346a8]',
  },
  teal: {
    card: 'bg-white shadow-[0_9px_30px_rgba(24,57,90,0.06)]',
    band: 'bg-[#2a9d8f]',
    icon: 'bg-[#dff3f0] text-[#1d6f66]',
  },
  navy: {
    dark: true,
    card: 'border-[#123f66] bg-[#123f66] text-white shadow-[0_24px_50px_rgba(18,63,102,0.28)]',
    band: 'bg-[#7cc0f2]',
    icon: 'bg-white/15 text-[#b9d9f3]',
  },
}

const PLANS_BY_ID = Object.fromEntries(PLANS.map((plan) => [plan.id, plan]))

export function PlansPage() {
  const subscribe = (plan) => {
    toast.info(`Plano ${plan.name} em breve`, {
      description: 'A assinatura ainda está sendo preparada. Avisaremos quando estiver disponível.',
    })
  }

  return (
    <>
      <PageHeader kicker="PLANOS DE CUIDADO" title="Escolha o seu plano" />

      {PLAN_GROUPS.map((group, index) => {
        const plans = group.planIds.map((id) => PLANS_BY_ID[id]).filter(Boolean)
        const wide = plans.length < 3
        return (
          <section key={group.id} aria-labelledby={`grupo-${group.id}`} className="mt-12 first-of-type:mt-10">
            <div className="flex items-start gap-4">
              <span
                className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e5f3ff] text-xl font-semibold text-[#1f5e8d]"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div>
                <h2
                  id={`grupo-${group.id}`}
                  className="font-display text-2xl font-semibold tracking-[-0.03em] text-[#12395a] sm:text-3xl"
                >
                  {group.title}
                </h2>
                <p className="mt-1 max-w-2xl text-lg leading-relaxed text-[#5b748b]">{group.description}</p>
              </div>
            </div>

            <ul className={`mt-6 grid gap-6 ${wide ? '' : 'lg:grid-cols-3'}`}>
              {plans.map((plan) => (
                <li key={plan.id} className="flex">
                  <PlanCard plan={plan} wide={wide} onSubscribe={subscribe} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      <p className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl bg-[#f1f7fc] p-4 leading-relaxed text-[#4d6980]">
        <LuInfo size={20} className="mt-0.5 shrink-0 text-[#2d7bbf]" aria-hidden="true" />
        {PRICE_NOTE}
      </p>

      <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-[#5b748b]">
        <LuLifeBuoy size={18} className="text-[#2d7bbf]" aria-hidden="true" />
        Ficou em dúvida sobre qual escolher?
        <Link to="/suporte" className="font-extrabold text-[#2d7bbf] underline-offset-4 hover:underline">
          Fale com a gente
        </Link>
      </p>
    </>
  )
}

/** Card de um plano. `wide` deixa o card na horizontal: dados e botão à esquerda, benefícios em duas colunas à direita. */
function PlanCard({ plan, wide, onSubscribe }) {
  const accent = ACCENTS[plan.accent] ?? ACCENTS.sky
  const { dark } = accent
  const Icon = PLAN_ICONS[plan.id] ?? LuHeartHandshake
  const price = formatPlanPrice(plan)
  const muted = dark ? 'text-[#b9d9f3]' : 'text-[#5b748b]'

  return (
    <article
      aria-labelledby={`plano-${plan.id}`}
      className={`relative flex w-full flex-col overflow-hidden rounded-[1.8rem] border p-7 pt-8 ${accent.card} ${
        wide ? 'md:grid md:grid-cols-[minmax(0,19rem)_1fr] md:gap-10 md:p-8 md:pt-9' : ''
      }`}
    >
      <span className={`absolute inset-x-0 top-0 h-1.5 ${accent.band}`} aria-hidden="true" />

      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accent.icon}`}>
            <Icon size={24} aria-hidden="true" />
          </span>
          <div>
            <h3
              id={`plano-${plan.id}`}
              className={`font-display text-2xl font-semibold tracking-[-0.03em] ${dark ? '' : 'text-[#12395a]'}`}
            >
              {plan.name}
            </h3>
            <p className={`font-bold ${dark ? 'text-[#d7e7f5]' : 'text-[#5b748b]'}`}>{plan.tagline}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className={`text-sm font-bold ${muted}`}>{price.prefix}</p>
          <p className="flex flex-wrap items-baseline gap-x-1">
            <span className={`font-display text-4xl font-semibold tracking-[-0.04em] ${dark ? '' : 'text-[#12395a]'}`}>
              {price.value}
            </span>
            <span className={`font-bold ${muted}`}>/mês</span>
          </p>
        </div>

        {wide && <SubscribeButton plan={plan} dark={dark} onSubscribe={onSubscribe} className="hidden md:block" />}
      </div>

      <ul
        className={`mt-6 flex-1 gap-x-8 gap-y-3 border-t pt-6 ${dark ? 'border-white/15' : ''} ${
          wide ? 'grid content-start sm:grid-cols-2 md:mt-0 md:border-t-0 md:border-l md:pt-0 md:pl-10' : 'grid content-start'
        }`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${accent.icon}`}
            >
              <LuCheck size={15} aria-hidden="true" />
            </span>
            <span className={dark ? 'text-[#eef6fd]' : 'text-[#34566f]'}>{feature}</span>
          </li>
        ))}
      </ul>

      <SubscribeButton plan={plan} dark={dark} onSubscribe={onSubscribe} className={wide ? 'md:hidden' : ''} />
    </article>
  )
}

function SubscribeButton({ plan, dark, onSubscribe, className = '' }) {
  return (
    <button
      type="button"
      onClick={() => onSubscribe(plan)}
      className={`mt-8 min-h-12 rounded-full px-6 font-extrabold transition active:scale-[0.98] ${
        dark
          ? 'bg-white text-[#123f66] hover:bg-[#e5f3ff]'
          : 'border bg-white text-[#1f5e8d] hover:border-[#2d7bbf] hover:bg-[#e5f3ff]'
      } ${className}`}
    >
      Assinar o {plan.name}
    </button>
  )
}
