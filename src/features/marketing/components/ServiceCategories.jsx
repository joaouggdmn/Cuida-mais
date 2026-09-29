import { LuArrowRight } from 'react-icons/lu'
import { SERVICE_CATEGORIES } from '../content'

export function ServiceCategories() {
  return (
    <section id="servicos" className="relative z-10 -mt-1 bg-[#ffffff] py-20 sm:py-28">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-kicker">CUIDADO QUE ACOMPANHA</p>
            <h2 className="font-display mt-4 max-w-lg text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#12395a] sm:text-5xl">
              O que faz bem para hoje?
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-[#5b748b]">
            Cada pessoa vive a maturidade de um jeito. Por isso, construímos uma presença que se adapta ao
            ritmo, às escolhas e à casa de cada família.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {SERVICE_CATEGORIES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-[1.6rem] border bg-white p-7 shadow-[0_9px_30px_rgba(60,79,66,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(39,79,62,0.14)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f3ff] text-[#1f5e8d]">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h3 className="font-display mt-7 text-2xl font-semibold tracking-[-0.03em] text-[#173f62]">{title}</h3>
              <p className="mt-3 leading-relaxed text-[#5b748b]">{description}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#1f5e8d]">
                Saiba mais
                <LuArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
