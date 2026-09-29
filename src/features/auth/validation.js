import { isValidCpf, onlyDigits } from '@/utils/cpf'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const MIN_PASSWORD_LENGTH = 8

function validateEmail(email) {
  if (!email.trim()) return 'Informe seu e-mail.'
  if (!EMAIL_PATTERN.test(email.trim())) return 'Confira o e-mail: ele precisa ter o formato nome@exemplo.com.'
  return null
}

function compact(errors) {
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message))
}

export function validateLogin({ email, password }) {
  return compact({
    email: validateEmail(email),
    password: password ? null : 'Informe sua senha.',
  })
}

export function validateRegister({ role, name, email, cpf, password, confirmPassword }) {
  let cpfError = null
  if (!onlyDigits(cpf)) cpfError = 'Informe seu CPF.'
  else if (!isValidCpf(cpf)) cpfError = 'CPF inválido. Confira os números.'

  let confirmError = null
  if (!confirmPassword) confirmError = 'Repita a senha.'
  else if (confirmPassword !== password) confirmError = 'As senhas não são iguais.'

  return compact({
    role: role ? null : 'Escolha como você vai usar a CUIDA+.',
    name: name.trim().length >= 3 ? null : 'Informe seu nome completo.',
    email: validateEmail(email),
    cpf: cpfError,
    password:
      password.length >= MIN_PASSWORD_LENGTH ? null : `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`,
    confirmPassword: confirmError,
  })
}
