import { LuArrowRight, LuCalendarPlus, LuMessageCircle } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { CaregiverAvatar } from '@/features/caregivers/components/CaregiverAvatar'
import { getCaregiver } from '@/mocks/caregivers'
import { formatRelativeDay, fromISODate } from '@/utils/date'

const lightButton =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 font-extrabold text-[#123f66] transition hover:bg-[#e5f3ff]'
const outlineButton =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-5 font-extrabold text-white transition hover:bg-white/10'

export function NextBookingCard({ bookings }) {
  const [next, ...others] = bookings
  const caregiver = next && getCaregiver(next.caregiverId)

  return (
    <section aria-labelledby="proximo-atendimento" className="flex flex-col rounded-[1.8rem] bg-[#123f66] p-7 text-white sm:p-8">
      <p id="proximo-atendimento" className="section-kicker text-[#b9d9f3]">
        PRÓXIMO ATENDIMENTO
      </p>

      {caregiver ? (
        <>
          <p className="font-display mt-4 text-4xl font-semibold tracking-[-0.04em]">
            {formatRelativeDay(fromISODate(next.date))}, {next.time}
          </p>
          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-white/10 p-4">
            <CaregiverAvatar caregiver={caregiver} />
            <div className="min-w-0">
              <p className="truncate font-extrabold">{caregiver.name}</p>
              <p className="truncate text-sm text-[#d7e7f5]">{caregiver.role}</p>
            </div>
          </div>
          {others.length > 0 && (
            <p className="mt-4 text-sm text-[#d7e7f5]">
              + {others.length} {others.length === 1 ? 'outro atendimento marcado' : 'outros atendimentos marcados'}
            </p>
          )}
          <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
            <Link to={`/chat/${caregiver.id}`} className={lightButton}>
              <LuMessageCircle size={18} aria-hidden="true" />
              Conversar
            </Link>
            <Link to="/agenda" className={outlineButton}>
              Ver agenda
              <LuArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="font-display mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Nenhum cuidado marcado ainda.
          </p>
          <p className="mt-3 max-w-md leading-relaxed text-[#d7e7f5]">
            Veja quem está disponível nos próximos dias e agende o primeiro atendimento.
          </p>
          <div className="mt-auto pt-7">
            <Link to="/agenda" className={lightButton}>
              <LuCalendarPlus size={18} aria-hidden="true" />
              Agendar agora
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
