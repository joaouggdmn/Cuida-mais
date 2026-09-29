import { useId } from 'react'

export const inputClassName =
  'h-12 w-full rounded-xl border bg-white px-4 text-base font-medium text-[#183f61] outline-none transition placeholder:font-normal placeholder:text-[#7890a4] focus:border-[#2d7bbf] focus:ring-2 focus:ring-[#b9d9f3] aria-invalid:border-[#b83c2d] aria-invalid:focus:ring-[#f3c6bf]'

/**
 * Campo com rótulo, dica e erro ligados ao input por aria-describedby.
 * `endAdornment` fica sobreposto à direita do input (ex.: botão de mostrar senha).
 */
export function TextField({ ref, label, hint, error, endAdornment, className = '', ...inputProps }) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-extrabold text-[#245a82]">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputClassName} ${endAdornment ? 'pr-14' : ''}`}
          {...inputProps}
        />
        {endAdornment && <div className="absolute inset-y-0 right-1 flex items-center">{endAdornment}</div>}
      </div>
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-[#5b748b]">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-bold text-[#b83c2d]">
          {error}
        </p>
      )}
    </div>
  )
}
