import { LuArrowRight, LuCircleAlert } from 'react-icons/lu'

export function AuthCard({ kicker, title, description, formError, footer, className = '', children }) {
  return (
    <div
      className={`w-full rounded-[1.8rem] border bg-white p-6 shadow-[0_20px_60px_rgba(24,57,90,0.12)] sm:p-10 ${className}`}
    >
      <p className="section-kicker">{kicker}</p>
      <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#12395a]">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-[#5b748b]">{description}</p>

      {formError && (
        <p
          role="alert"
          className="mt-6 flex items-center gap-3 rounded-2xl bg-[#fdecea] px-4 py-3 text-base font-bold text-[#b83c2d]"
        >
          <LuCircleAlert size={20} className="shrink-0" aria-hidden="true" />
          {formError}
        </p>
      )}

      {children}

      <p className="mt-8 border-t pt-6 text-center text-base text-[#5b748b]">{footer}</p>
    </div>
  )
}

export function SubmitButton({ submitting, children, submittingLabel }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="mt-8 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#123f66] px-6 text-base font-extrabold text-white shadow-[0_12px_28px_rgba(18,63,102,0.2)] transition hover:bg-[#0d2f4f] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
    >
      {submitting ? submittingLabel : children}
      {!submitting && <LuArrowRight size={19} aria-hidden="true" />}
    </button>
  )
}
