import { useRef, useState } from 'react'
import { AuthError } from '../services/authStorage'

/**
 * Estado e envio dos formulários de login e cadastro.
 * Valida no envio; depois da primeira tentativa, revalida a cada alteração
 * e leva o foco ao primeiro campo com erro (na ordem de `initialValues`).
 */
export function useAuthForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const attempted = useRef(false)
  const fieldRefs = useRef({})

  const fieldRef = (name) => (element) => {
    fieldRefs.current[name] = element
  }

  const focusField = (name) => fieldRefs.current[name]?.focus()

  const setField = (name, value) => {
    const next = { ...values, [name]: value }
    setValues(next)
    if (attempted.current) setErrors(validate(next))
  }

  const handleSubmit = (onValid) => async (event) => {
    event.preventDefault()
    attempted.current = true
    setFormError('')

    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(initialValues).find((name) => nextErrors[name])
    if (firstInvalid) {
      focusField(firstInvalid)
      return
    }

    setSubmitting(true)
    try {
      await onValid(values)
    } catch (error) {
      if (error instanceof AuthError && error.field) {
        setErrors((current) => ({ ...current, [error.field]: error.message }))
        focusField(error.field)
      } else {
        setFormError(error instanceof AuthError ? error.message : 'Não foi possível concluir agora. Tente novamente.')
      }
      setSubmitting(false)
    }
  }

  return { values, errors, formError, submitting, setField, fieldRef, handleSubmit }
}
