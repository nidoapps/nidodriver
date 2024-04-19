export function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function isValidPhone(phone: string) {
  const regex = /^(6|7|8)[0-9]{7}$/;
  return regex.test(phone);
}
