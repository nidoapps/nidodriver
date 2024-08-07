export function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

export const RegExpByCountry: { [key: string]: RegExp } = {
  '+507': /^(6|7|8)[0-9]{7}$/,
  '+57': /^[0-9]{10}$/,
  '+1': /^[0-9]{10}$/,
}
export function isValidPhone(phone: string, countryCode: string) {
  const regex = RegExpByCountry[countryCode]
  if (phone && regex) return regex.test(phone)
}

export function getInitials(fullName: string) {
  const upperCaseFullName = fullName.toUpperCase()
  const nameParts = upperCaseFullName.split(' ')
  let initials = ''

  for (const word of nameParts) {
    const firstCharacter = word.charAt(0)
    initials += firstCharacter
  }

  return initials
}
