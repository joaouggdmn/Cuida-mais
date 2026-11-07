import { useEffect, useId, useRef } from 'react'
import { LuArrowRight, LuLogIn, LuX } from 'react-icons/lu'
import { Link } from 'react-router-dom'

/**
 * Convite para entrar ou criar conta, aberto pelas ações da demonstração da landing.
 * `prompt` = { title, description } abre o diálogo; null fecha.
 */
export function LoginPromptDialog({ prompt, onClose }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (prompt && !dialog.open) dialog.showModal()
    if (!prompt && dialog.open) dialog.close()
  }, [prompt])

  const close = () => dialogRef.current.close()

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      // Clique no fundo escurecido (fora do conteúdo) fecha o diálogo.
      onClick={(event) => event.target === dialogRef.current && close()}
      aria-labelledby={titleId}
      className="m-auto w-[min(28rem,calc(100%-2rem))] rounded-[1.6rem] border bg-white p-0 text-[#18324a] shadow-[0_24px_60px_rgba(18,57,90,0.25)] backdrop:bg-[#12395a]/45"
    >
      {prompt && (
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f3ff] text-[#1f5e8d]">
              <LuLogIn size={24} aria-hidden="true" />
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
            {prompt.title}
          </h2>
          <p className="mt-3 leading-relaxed text-[#4d6980]">{prompt.description}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse">
            <Link
              to="/login"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#2d7bbf] px-6 font-extrabold text-white transition hover:bg-[#236596] active:scale-[0.98]"
            >
              Entrar
              <LuArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/cadastro"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border bg-white px-6 font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
            >
              Criar conta
            </Link>
          </div>
          <button
            type="button"
            onClick={close}
            className="mt-3 min-h-11 w-full rounded-full text-sm font-bold text-[#5b748b] transition hover:text-[#1f5e8d]"
          >
            Agora não
          </button>
        </div>
      )}
    </dialog>
  )
}
