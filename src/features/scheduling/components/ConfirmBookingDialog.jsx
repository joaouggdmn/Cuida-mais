import { useEffect, useId, useRef } from 'react'
import { LuCalendarCheck, LuX } from 'react-icons/lu'
import { CaregiverAvatar } from '@/features/caregivers/components/CaregiverAvatar'
import { formatLongDate } from '@/utils/date'

/** Confirmação do horário escolhido. `slot` = { caregiver, date, time } abre o diálogo; null fecha. */
export function ConfirmBookingDialog({ slot, onConfirm, onClose }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (slot && !dialog.open) dialog.showModal()
    if (!slot && dialog.open) dialog.close()
  }, [slot])

  const close = () => dialogRef.current.close()

  const confirm = () => {
    onConfirm(slot)
    close()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      // Clique no fundo escurecido (fora do conteúdo) fecha o diálogo.
      onClick={(event) => event.target === dialogRef.current && close()}
      aria-labelledby={titleId}
      className="m-auto w-[min(30rem,calc(100%-2rem))] rounded-[1.6rem] border bg-white p-0 text-[#18324a] shadow-[0_24px_60px_rgba(18,57,90,0.25)] backdrop:bg-[#12395a]/45"
    >
      {slot && (
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f3ff] text-[#1f5e8d]">
              <LuCalendarCheck size={24} aria-hidden="true" />
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#5b748b] transition hover:bg-[#f1f7fc]"
            >
              <LuX size={20} aria-hidden="true" />
            </button>
          </div>

          <h2 id={titleId} className="font-display mt-5 text-3xl font-semibold tracking-[-0.03em] text-[#12395a]">
            Confirmar atendimento?
          </h2>

          <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#f7fbff] p-4">
            <CaregiverAvatar caregiver={slot.caregiver} />
            <div>
              <p className="font-extrabold text-[#173f62]">{slot.caregiver.name}</p>
              <p className="text-sm text-[#5b748b]">{slot.caregiver.role}</p>
            </div>
          </div>

          <p className="mt-4 text-lg text-[#245a82]">
            {formatLongDate(slot.date)}, às{' '}
            <strong className="font-extrabold text-[#12395a]">{slot.time}</strong>
          </p>
          <p className="mt-2 text-sm text-[#5b748b]">Você poderá conversar com o cuidador para combinar os detalhes.</p>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={close}
              className="min-h-12 rounded-full border bg-white px-6 font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={confirm}
              className="min-h-12 rounded-full bg-[#2d7bbf] px-6 font-extrabold text-white transition hover:bg-[#236596] active:scale-[0.98]"
            >
              Confirmar agendamento
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
