import { LuHeartHandshake } from 'react-icons/lu'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getFirstName } from '@/utils/name'
import { CAREGIVER_CONTENT } from '../content'

/** Início provisório do cuidador, até a área dele ser desenhada. */
export function CaregiverHome() {
  const { user } = useAuth()

  return (
    <>
      <section className="rounded-[1.8rem] bg-[#123f66] p-8 text-white sm:p-10">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#b9d9f3]">
            <LuHeartHandshake size={28} aria-hidden="true" />
          </span>
          <div>
            <p className="section-kicker text-[#b9d9f3]">{CAREGIVER_CONTENT.kicker}</p>
            <h1 className="font-display mt-2 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Olá, {getFirstName(user.name)}.
            </h1>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#d7e7f5]">{CAREGIVER_CONTENT.description}</p>
      </section>

      <section className="mt-14" aria-labelledby="em-breve">
        <p className="section-kicker">EM CONSTRUÇÃO</p>
        <h2
          id="em-breve"
          className="font-display mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#12395a] sm:text-4xl"
        >
          O que vem por aí
        </h2>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-[#5b748b]">
          Estas funções ainda estão sendo preparadas com carinho.
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {CAREGIVER_CONTENT.upcoming.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="rounded-[1.6rem] border bg-white p-7 shadow-[0_9px_30px_rgba(60,79,66,0.06)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f3ff] text-[#1f5e8d]">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="rounded-full bg-[#f1f7fc] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[#5b748b]">
                  Em breve
                </span>
              </div>
              <h3 className="font-display mt-6 text-2xl font-semibold tracking-[-0.03em] text-[#173f62]">{title}</h3>
              <p className="mt-2 leading-relaxed text-[#5b748b]">{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
