export enum HttpErrorsEnum {}

export const AuthErrorsMap = {
  email: 'User email not found',
  phone: 'User phone not found',
}

export const AuthErrorsMessages: { [key: string]: string } = {
  email: 'signIn.errors.email',
  phone: 'signIn.errors.phone',
}
