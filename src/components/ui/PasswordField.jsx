import { useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { TextField } from './TextField'

export function PasswordField(props) {
  const [visible, setVisible] = useState(false)

  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-pressed={visible}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
        >
          {visible ? <LuEyeOff size={20} aria-hidden="true" /> : <LuEye size={20} aria-hidden="true" />}
        </button>
      }
    />
  )
}
