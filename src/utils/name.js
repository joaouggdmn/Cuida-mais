export function getFirstName(fullName) {
  return fullName.trim().split(/\s+/)[0] ?? ''
}
