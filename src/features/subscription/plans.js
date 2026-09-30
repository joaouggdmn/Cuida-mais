// PROVISÓRIO: nomes, preços e benefícios só para visualizar o layout.
// Trocar pelos planos reais quando o modelo de negócio estiver fechado.
export const PLANS = [
  {
    id: 'essencial',
    name: 'Essencial',
    price: 99,
    tagline: 'Para começar com tranquilidade.',
    features: ['Até 4 atendimentos por mês', 'Chat com os cuidadores', 'Suporte em horário comercial'],
  },
  {
    id: 'completo',
    name: 'Completo',
    price: 199,
    highlighted: true,
    tagline: 'O equilíbrio certo para a rotina da semana.',
    features: [
      'Até 12 atendimentos por mês',
      'Chat com os cuidadores',
      'Resumo de cada atendimento para a família',
      'Suporte prioritário',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 349,
    tagline: 'Cuidado presente todos os dias.',
    features: [
      'Atendimentos sem limite',
      'Cuidador de referência fixo',
      'Acompanhamento semanal com a equipe',
      'Suporte 24 horas',
    ],
  },
]

const priceFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export function formatPrice(value) {
  return priceFormat.format(value)
}

export const LOWEST_PRICE = Math.min(...PLANS.map(({ price }) => price))
