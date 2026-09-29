import {
  LuBellRing,
  LuCalendarCheck,
  LuCalendarDays,
  LuClock3,
  LuInbox,
  LuMessageCircle,
  LuUsers,
} from 'react-icons/lu'

// Conteúdo provisório de cada área logada, até os dashboards de verdade existirem.
export const ROLE_CONTENT = {
  elder: {
    kicker: 'ÁREA DO IDOSO',
    description: 'Sua rotina, suas escolhas e a ajuda que você quiser — tudo em um só lugar.',
    upcoming: [
      { icon: LuCalendarDays, title: 'Minha agenda', description: 'Veja os cuidados marcados para cada dia.' },
      { icon: LuBellRing, title: 'Pedir ajuda rápida', description: 'Avise a equipe CUIDA+ quando precisar agora.' },
      { icon: LuMessageCircle, title: 'Conversas', description: 'Fale com seus cuidadores com tranquilidade.' },
    ],
  },
  family: {
    kicker: 'MINHA ÁREA CUIDA+',
    description: 'Encontre profissionais, agende atendimentos e acompanhe de perto a rotina de quem você ama.',
    upcoming: [
      { icon: LuUsers, title: 'Vitrine de profissionais', description: 'Compare cuidadores por avaliação e disponibilidade.' },
      { icon: LuCalendarDays, title: 'Agendar atendimento', description: 'Escolha a cidade, o dia e quem vai cuidar.' },
      { icon: LuMessageCircle, title: 'Conversas', description: 'Combine os detalhes direto com o cuidador.' },
    ],
  },
  caregiver: {
    kicker: 'ÁREA DO CUIDADOR',
    description: 'Organize sua disponibilidade, receba solicitações e acompanhe seus atendimentos.',
    upcoming: [
      { icon: LuClock3, title: 'Minha disponibilidade', description: 'Defina os dias e horários em que você atende.' },
      { icon: LuInbox, title: 'Solicitações', description: 'Aceite ou recuse os pedidos de atendimento.' },
      { icon: LuCalendarCheck, title: 'Agenda confirmada', description: 'Veja seus próximos atendimentos.' },
    ],
  },
}
