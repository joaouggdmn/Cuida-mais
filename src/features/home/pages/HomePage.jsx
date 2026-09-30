import { useAuth } from '@/features/auth/hooks/useAuth'
import { useBookings } from '@/features/scheduling/hooks/useBookings'
import { formatLongDate } from '@/utils/date'
import { getFirstName } from '@/utils/name'
import { AvailableTodayCard } from '../components/AvailableTodayCard'
import { CaregiverHome } from '../components/CaregiverHome'
import { NextBookingCard } from '../components/NextBookingCard'
import { PlansBanner } from '../components/PlansBanner'
import { RecentMessagesCard } from '../components/RecentMessagesCard'
import { SupportCard } from '../components/SupportCard'
import { HOME_GREETING } from '../content'

export function HomePage() {
  const { user } = useAuth()
  if (user.role === 'caregiver') return <CaregiverHome />
  return <CareSeekerHome />
}

/** Início do idoso e do familiar: resumo da agenda, do chat, dos planos e do suporte. */
function CareSeekerHome() {
  const { user } = useAuth()
  const { bookings, upcoming } = useBookings()
  const greeting = HOME_GREETING[user.role] ?? HOME_GREETING.family

  return (
    <>
      <header>
        <p className="section-kicker">{greeting.kicker}</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#12395a] sm:text-5xl">
          Olá, {getFirstName(user.name)}.
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#5b748b]">
          <span className="font-bold text-[#245a82]">{formatLongDate(new Date())}.</span> {greeting.description}
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <NextBookingCard bookings={upcoming} />
        <RecentMessagesCard />
        <div className="lg:col-span-2">
          <AvailableTodayCard bookings={bookings} />
        </div>
        <PlansBanner />
        <SupportCard />
      </div>
    </>
  )
}
