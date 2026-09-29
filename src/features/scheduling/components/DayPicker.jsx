import { formatShortMonth, formatWeekday, isSameDay } from '@/utils/date'

/** Faixa com os próximos dias; embaixo de cada um, quantos cuidadores estão livres. */
export function DayPicker({ days, selectedIndex, onSelect, freeCountByDay }) {
  const today = new Date()

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      <ul className="flex gap-2 sm:grid sm:grid-cols-7">
        {days.map((day, index) => {
          const selected = index === selectedIndex
          const freeCount = freeCountByDay[index]
          return (
            <li key={day.toISOString()} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-pressed={selected}
                className={`flex w-[5.5rem] flex-col items-center rounded-2xl border px-2 py-3 transition sm:w-full ${
                  selected
                    ? 'border-[#123f66] bg-[#123f66] text-white shadow-md'
                    : 'bg-white text-[#245a82] hover:bg-[#e5f3ff]'
                }`}
              >
                <span className={`text-xs font-extrabold uppercase tracking-[0.08em] ${selected ? 'text-[#b9d9f3]' : 'text-[#7190a8]'}`}>
                  {isSameDay(day, today) ? 'Hoje' : formatWeekday(day)}
                </span>
                <span className="font-display mt-1 text-2xl font-semibold">{day.getDate()}</span>
                <span className={`mt-0.5 text-xs ${selected ? 'text-[#d7e7f5]' : 'text-[#5b748b]'}`}>
                  {formatShortMonth(day)}
                </span>
                <span
                  className={`mt-2 rounded-full px-2 py-0.5 text-[0.7rem] font-bold ${
                    selected ? 'bg-white/15 text-white' : freeCount > 0 ? 'bg-[#e5f3ff] text-[#1f5e8d]' : 'bg-[#f1f5f9] text-[#7890a4]'
                  }`}
                >
                  {freeCount > 0 ? `${freeCount} livre${freeCount > 1 ? 's' : ''}` : 'Sem vagas'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
