// Planos de cuidado do CUIDA+. Também alimentam o assistente virtual (api/_lib/supportKnowledge.js).
// Sem `priceTo`, o preço é exibido como "a partir de".
export const PLANS = [
  {
    id: 'essencial',
    name: 'Essencial',
    tagline: 'Suporte básico',
    priceFrom: 400,
    priceTo: 690,
    accent: 'sky',
    features: [
      'Cadastro do idoso na plataforma',
      'Organização das necessidades de cuidado',
      'Orientações básicas aos familiares',
      'Indicação de profissionais qualificados',
      'Suporte pelo aplicativo',
    ],
  },
  {
    id: 'cuidado-diario',
    name: 'Cuidado Diário',
    tagline: 'Assistência diurna',
    priceFrom: 4500,
    accent: 'amber',
    features: [
      'Profissional durante o dia',
      'Auxílio na rotina e higiene',
      'Apoio na alimentação e mobilidade',
      'Acompanhamento em consultas',
      'Relatórios e comunicação com familiares',
    ],
  },
  {
    id: 'presenca',
    name: 'Presença',
    tagline: 'Acompanhamento noturno',
    priceFrom: 5500,
    accent: 'indigo',
    features: [
      'Profissional durante o período noturno',
      'Acompanhamento e assistência durante a noite',
      'Suporte conforme as necessidades do idoso',
      'Registro de ocorrências',
      'Comunicação com familiares',
    ],
  },
  {
    id: 'integral',
    name: 'Integral',
    tagline: 'Assistência 24 horas',
    priceFrom: 6400,
    accent: 'navy',
    features: [
      'Assistência durante 24 horas',
      'Revezamento entre profissionais',
      'Acompanhamento contínuo',
      'Organização dos cuidados',
      'Supervisão e comunicação com familiares',
    ],
  },
  {
    id: 'multidisciplinar',
    name: 'Multidisciplinar',
    tagline: 'Cuidado especializado',
    priceFrom: 1800,
    accent: 'teal',
    features: [
      'Acompanhamento de diferentes profissionais da saúde',
      'Atendimento de enfermagem',
      'Acompanhamento fisioterapêutico',
      'Orientação nutricional',
      'Consultas e acompanhamento conforme as necessidades do idoso',
    ],
  },
]

/** Como a página Planos agrupa os planos, para facilitar a escolha. */
export const PLAN_GROUPS = [
  {
    id: 'profissional',
    title: 'Um profissional ao lado do idoso',
    description: 'Um cuidador acompanha a rotina de perto: durante o dia, durante a noite ou nas 24 horas.',
    planIds: ['cuidado-diario', 'presenca', 'integral'],
  },
  {
    id: 'orientacao',
    title: 'Orientação e cuidado especializado',
    description: 'Para organizar os cuidados da família ou somar o apoio de profissionais da saúde.',
    planIds: ['essencial', 'multidisciplinar'],
  },
]

export const PRICE_NOTE =
  'Os valores podem variar conforme as necessidades do idoso, a quantidade de profissionais envolvidos e a carga horária contratada.'

const priceFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export function formatPrice(value) {
  return priceFormat.format(value)
}

/** Preço do plano dividido em prefixo ("De" / "A partir de") e valor, para exibir em destaque. */
export function formatPlanPrice({ priceFrom, priceTo }) {
  if (priceTo) return { prefix: 'De', value: `${formatPrice(priceFrom)} a ${formatPrice(priceTo)}` }
  return { prefix: 'A partir de', value: formatPrice(priceFrom) }
}

export const LOWEST_PRICE = Math.min(...PLANS.map(({ priceFrom }) => priceFrom))
