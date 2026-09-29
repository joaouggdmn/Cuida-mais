import { useId } from 'react'
import { LuCircleCheck } from 'react-icons/lu'
import { ROLES } from '../roles'

export function RoleSelector({ value, onChange, error, firstOptionRef }) {
  const errorId = useId()

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-sm font-extrabold text-[#245a82]">Como você vai usar a CUIDA+?</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {ROLES.map(({ value: roleValue, label, description, icon: Icon }, index) => {
          const selected = value === roleValue
          return (
            <label
              key={roleValue}
              className={`relative flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#2d7bbf] has-[:focus-visible]:ring-offset-2 ${
                selected
                  ? 'border-[#123f66] bg-[#123f66] text-white shadow-md'
                  : `bg-[#f7fbff] text-[#173f62] hover:border-[#a9cae5] hover:bg-white ${error ? 'border-[#e8b4ab]' : ''}`
              }`}
            >
              <input
                ref={index === 0 ? firstOptionRef : undefined}
                type="radio"
                name="role"
                value={roleValue}
                checked={selected}
                onChange={() => onChange(roleValue)}
                aria-invalid={error ? true : undefined}
                className="sr-only"
              />
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                  selected ? 'bg-white/10 text-[#b9d9f3]' : 'bg-[#dff1ff] text-[#1f5e8d]'
                }`}
              >
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className="text-base font-extrabold">{label}</span>
              <span className={`text-sm leading-snug ${selected ? 'text-[#d7e7f5]' : 'text-[#5b748b]'}`}>
                {description}
              </span>
              {selected && (
                <LuCircleCheck size={20} className="absolute right-4 top-4 text-[#b9d9f3]" aria-hidden="true" />
              )}
            </label>
          )
        })}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-bold text-[#b83c2d]">
          {error}
        </p>
      )}
    </fieldset>
  )
}
