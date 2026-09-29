import { LuMessageCircle, LuPhone } from 'react-icons/lu'
import { SUPPORT_CONTACT } from '../content'

const buttonClassName =
  'flex min-h-14 flex-1 items-center gap-3 rounded-2xl px-4 text-left transition active:scale-[0.98]'

/** Botões grandes de telefone e WhatsApp da equipe CUIDA+. `stacked` mantém um embaixo do outro. */
export function ContactButtons({ stacked = false, className = '' }) {
  const { phone, whatsapp } = SUPPORT_CONTACT

  return (
    <div className={`flex flex-col gap-3 ${stacked ? '' : 'sm:flex-row'} ${className}`}>
      <a href={phone.href} className={`${buttonClassName} bg-[#123f66] text-white hover:bg-[#0f3454]`}>
        <LuPhone size={22} className="shrink-0 text-[#b9d9f3]" aria-hidden="true" />
        <span>
          <span className="block text-xs font-bold uppercase tracking-[0.08em] text-[#b9d9f3]">Ligar</span>
          <span className="block font-extrabold">{phone.label}</span>
        </span>
      </a>
      <a
        href={whatsapp.href}
        target="_blank"
        rel="noreferrer"
        className={`${buttonClassName} bg-[#2d7bbf] text-white hover:bg-[#236596]`}
      >
        <LuMessageCircle size={22} className="shrink-0 text-[#d7ecff]" aria-hidden="true" />
        <span>
          <span className="block text-xs font-bold uppercase tracking-[0.08em] text-[#d7ecff]">WhatsApp</span>
          <span className="block font-extrabold">{whatsapp.label}</span>
        </span>
      </a>
    </div>
  )
}
