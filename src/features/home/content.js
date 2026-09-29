import { LuCalendarCheck, LuClock3, LuInbox } from 'react-icons/lu'

export const HOME_GREETING = {
  elder: {
    kicker: 'ÁREA DO IDOSO',
    description: 'Sua rotina, suas escolhas e a ajuda que você quiser — tudo em um só lugar.',
  },
  family: {
    kicker: 'MINHA ÁREA CUIDA+',
    description: 'Encontre profissionais, agende atendimentos e acompanhe de perto o cuidado de quem você ama.',
  },
}

// Conteúdo provisório da área do cuidador, até ela ser desenhada.
export const CAREGIVER_CONTENT = {
  kicker: 'ÁREA DO CUIDADOR',
  description: 'Organize sua disponibilidade, receba solicitações e acompanhe seus atendimentos.',
  upcoming: [
    { icon: LuClock3, title: 'Minha disponibilidade', description: 'Defina os dias e horários em que você atende.' },
    { icon: LuInbox, title: 'Solicitações', description: 'Aceite ou recuse os pedidos de atendimento.' },
    { icon: LuCalendarCheck, title: 'Agenda confirmada', description: 'Veja seus próximos atendimentos.' },
  ],
}
