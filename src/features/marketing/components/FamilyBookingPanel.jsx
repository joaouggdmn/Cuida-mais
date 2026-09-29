import { useState } from 'react'
import { LuArrowRight, LuCalendarDays, LuCircleCheck, LuMapPin } from 'react-icons/lu'
import { toast } from 'sonner'
import { CAREGIVERS, CITIES, WEEKDAYS } from '../content'
import { CaregiverChat } from './CaregiverChat'

const OCTOBER_DAYS = Array.from({ length: 31 }, (_, index) => index + 1)

export function FamilyBookingPanel() {
  const [city, setCity] = useState('Criciúma')
  const [day, setDay] = useState(12)
  const [caregiverId, setCaregiverId] = useState('maria')

  const requestAppointment = () => {
    const caregiver = CAREGIVERS.find(({ id }) => id === caregiverId)
    toast.success('Solicitação pronta', {
      description: `Vamos verificar ${caregiver?.name} para o dia ${day} em ${city}.`,
    })
  }

  return (
    <div className="mt-12 grid gap-6 xl:grid-cols-[0.75fr_1.25fr_1fr]">
      <div className="rounded-[1.6rem] border bg-[#f7fbff] p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dff1ff] text-[#1f5e8d]">
            <LuMapPin size={22} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold text-[#173f62]">Onde será?</h3>
            <p className="text-sm text-[#5b748b]">Escolha a cidade</p>
          </div>
        </div>

        <label className="mt-7 block text-sm font-extrabold text-[#245a82]">
          Cidade de atendimento
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="mt-2 h-12 w-full rounded-xl border bg-white px-4 text-base font-medium text-[#183f61] outline-none focus:ring-2 focus:ring-[#b9d9f3]"
          >
            {CITIES.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>

        <div className="mt-7 rounded-2xl bg-white p-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#5b748b]">Atendimento selecionado</p>
          <p className="mt-2 font-display text-2xl font-semibold text-[#12395a]">Dia {day} · Outubro</p>
          <p className="mt-1 text-sm text-[#5b748b]">{city} · período a combinar</p>
        </div>
      </div>

      <div className="rounded-[1.6rem] border bg-white p-6 shadow-[0_12px_35px_rgba(24,57,90,0.07)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-kicker">AGENDA</p>
            <h3 className="font-display mt-2 text-2xl font-semibold text-[#12395a]">Escolha o dia</h3>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f3ff] text-[#1f5e8d]">
            <LuCalendarDays size={20} aria-hidden="true" />
          </span>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs font-extrabold text-[#7190a8]">
          {WEEKDAYS.map((weekday, index) => (
            <span key={`${weekday}-${index}`} className="py-2">
              {weekday}
            </span>
          ))}
          {OCTOBER_DAYS.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => setDay(date)}
              aria-label={`Selecionar dia ${date} de outubro`}
              aria-pressed={day === date}
              className={`aspect-square rounded-xl transition ${
                day === date ? 'bg-[#123f66] text-white shadow-md' : 'text-[#245a82] hover:bg-[#e5f3ff]'
              }`}
            >
              {date}
            </button>
          ))}
        </div>

        <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#5b748b]">
          <LuCircleCheck size={17} className="text-[#2d7bbf]" aria-hidden="true" />
          Você poderá ajustar o horário depois.
        </p>
      </div>

      <div className="rounded-[1.6rem] border bg-[#f7fbff] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-kicker">VITRINE DE PROFISSIONAIS</p>
            <h3 className="font-display mt-2 text-2xl font-semibold text-[#12395a]">Quem você prefere?</h3>
          </div>
          <span className="text-sm font-bold text-[#5b748b]">{CAREGIVERS.length} opções</span>
        </div>

        <div className="mt-5 grid gap-3">
          {CAREGIVERS.map((caregiver) => {
            const selected = caregiver.id === caregiverId
            return (
              <button
                key={caregiver.id}
                type="button"
                onClick={() => setCaregiverId(caregiver.id)}
                aria-pressed={selected}
                className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                  selected ? 'bg-white shadow-md' : 'bg-white/60'
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold ${caregiver.color}`}
                >
                  {caregiver.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold text-[#173f62]">{caregiver.name}</span>
                  <span className="block truncate text-xs text-[#5b748b]">{caregiver.role}</span>
                  <span className="mt-1 block text-xs font-bold text-[#1f5e8d]">
                    ★ {caregiver.rating} · {caregiver.available}
                  </span>
                </span>
                {selected && <LuCircleCheck size={20} className="shrink-0 text-[#2d7bbf]" aria-hidden="true" />}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={requestAppointment}
          className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2d7bbf] px-5 text-white transition hover:bg-[#236596] active:scale-[0.98]"
        >
          Solicitar este atendimento
          <LuArrowRight size={17} aria-hidden="true" />
        </button>
      </div>

      <CaregiverChat />
    </div>
  )
}
