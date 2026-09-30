// Cuidadores fictícios da área logada, só para testes visuais até a API existir.
// `availability` usa o dia da semana (0 = domingo) para sempre haver horários nos próximos dias.
// `color` guarda as classes Tailwind do avatar com as iniciais.
export const CAREGIVERS = [
  {
    id: 'maria',
    name: 'Maria Silva',
    role: 'Cuidadora de idosos',
    city: 'Criciúma',
    rating: '4,9',
    reviews: 42,
    initials: 'MS',
    color: 'bg-[#dff1ff] text-[#1f5e8d]',
    bio: 'Oito anos acompanhando idosos em casa, com foco em companhia e rotina.',
    availability: {
      1: ['08:00', '10:00', '14:00', '16:00'],
      2: ['08:00', '14:00'],
      3: ['10:00', '14:00', '16:00'],
      4: ['08:00', '10:00'],
      5: ['14:00', '16:00'],
      6: ['09:00'],
    },
  },
  {
    id: 'joao',
    name: 'João Fernandes',
    role: 'Técnico em enfermagem',
    city: 'Içara',
    rating: '4,8',
    reviews: 31,
    initials: 'JF',
    color: 'bg-[#e8f5ff] text-[#245a82]',
    bio: 'Apoio com medicação, curativos e acompanhamento em consultas.',
    availability: {
      1: ['09:00', '13:00'],
      2: ['09:00', '13:00', '17:00'],
      3: ['13:00'],
      5: ['09:00', '13:00', '17:00'],
      6: ['08:00', '10:00'],
    },
  },
  {
    id: 'ana',
    name: 'Ana Costa',
    role: 'Especialista em geriatria',
    city: 'Criciúma',
    rating: '5,0',
    reviews: 18,
    initials: 'AC',
    color: 'bg-[#d9edff] text-[#173f62]',
    bio: 'Enfermeira com pós em geriatria; cuidado para quem precisa de mais atenção.',
    availability: {
      2: ['15:00'],
      3: ['08:00', '10:00'],
      4: ['14:00', '16:00'],
      5: ['08:00'],
    },
  },
  {
    id: 'lucia',
    name: 'Lúcia Martins',
    role: 'Acompanhante de idosos',
    city: 'Nova Veneza',
    rating: '4,7',
    reviews: 26,
    initials: 'LM',
    color: 'bg-[#e7f1ec] text-[#2c5a49]',
    bio: 'Passeios, conversas e atividades para deixar os dias mais leves.',
    availability: {
      0: ['10:00', '15:00'],
      1: ['15:00', '18:00'],
      3: ['09:00', '15:00'],
      4: ['09:00', '15:00', '18:00'],
      6: ['10:00', '15:00'],
    },
  },
  {
    id: 'carlos',
    name: 'Carlos Souza',
    role: 'Cuidador de idosos',
    city: 'Siderópolis',
    rating: '4,8',
    reviews: 22,
    initials: 'CS',
    color: 'bg-[#eef3f8] text-[#34566f]',
    bio: 'Ajuda na mobilidade, higiene e nas tarefas da casa, com paciência.',
    availability: {
      0: ['08:00'],
      1: ['07:00', '11:00'],
      2: ['07:00', '11:00', '15:00'],
      4: ['07:00', '11:00'],
      5: ['07:00', '15:00'],
    },
  },
  {
    id: 'beatriz',
    name: 'Beatriz Rocha',
    role: 'Fisioterapeuta',
    city: 'Içara',
    rating: '4,9',
    reviews: 37,
    initials: 'BR',
    color: 'bg-[#e5f3ff] text-[#2d7bbf]',
    bio: 'Exercícios em casa para manter a força, o equilíbrio e a autonomia.',
    availability: {
      1: ['08:30', '17:30'],
      2: ['08:30'],
      3: ['08:30', '17:30'],
      5: ['08:30', '17:30'],
    },
  },
]

export const CAREGIVER_CITIES = [...new Set(CAREGIVERS.map(({ city }) => city))].sort()

export function getCaregiver(id) {
  return CAREGIVERS.find((caregiver) => caregiver.id === id) ?? null
}
