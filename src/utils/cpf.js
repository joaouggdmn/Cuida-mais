export function onlyDigits(value) {
  return value.replace(/\D/g, '')
}

/** Aplica a máscara 000.000.000-00 conforme a pessoa digita. */
export function formatCpf(value) {
  const digits = onlyDigits(value).slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
}

/** Esconde o começo e o fim do CPF para exibição: ***.456.789-** */
export function maskCpf(value) {
  const digits = onlyDigits(value)
  if (digits.length !== 11) return '***.***.***-**'
  return `***.${digits.slice(3, 6)}.${digits.slice(6, 9)}-**`
}

function checkDigit(digits, length) {
  const sum = digits
    .slice(0, length)
    .split('')
    .reduce((total, digit, index) => total + Number(digit) * (length + 1 - index), 0)
  const rest = (sum * 10) % 11
  return rest === 10 ? 0 : rest
}

export function isValidCpf(value) {
  const digits = onlyDigits(value)
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false
  return checkDigit(digits, 9) === Number(digits[9]) && checkDigit(digits, 10) === Number(digits[10])
}
