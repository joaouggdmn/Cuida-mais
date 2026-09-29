import { useState } from 'react'
import { LuUserRound, LuUsers } from 'react-icons/lu'
import { ElderPanel } from './ElderPanel'
import { FamilyBookingPanel } from './FamilyBookingPanel'

const AUDIENCE_TABS = [
  { value: 'family', label: 'Sou familiar', icon: LuUsers },
  { value: 'elder', label: 'Sou idoso', icon: LuUserRound },
]

export function CareAreaSection() {
  const [audience, setAudience] = useState('family')

  return (
    <section id="area" className="bg-[#ffffff] py-20 sm:py-28">
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">MINHA ÁREA CUIDA+</p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#12395a] sm:text-5xl">
              Escolha o cuidado que combina com a sua rotina.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5b748b]">
              Famílias acompanham tudo de perto. Idosos independentes escolhem como querem ser apoiados.
            </p>
          </div>

          <div className="flex rounded-2xl border bg-[#f1f7fc] p-1.5" role="tablist" aria-label="Tipo de acesso">
            {AUDIENCE_TABS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={audience === value}
                onClick={() => setAudience(value)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 transition ${
                  audience === value ? 'bg-[#123f66] text-white shadow-md' : 'text-[#245a82] hover:bg-white'
                }`}
              >
                <Icon size={17} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {audience === 'family' ? (
          <FamilyBookingPanel />
        ) : (
          <ElderPanel onSeeCaregivers={() => setAudience('family')} />
        )}
      </div>
    </section>
  )
}
