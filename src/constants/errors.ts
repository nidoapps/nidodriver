import { statusCodes } from '@react-native-google-signin/google-signin'

export enum HttpErrorsEnum {}

export const AuthErrorsMap = {
  email: 'User email not found',
  phone: 'User phone not found',
}

export const AuthErrorsMessages: { [key: string]: string } = {
  email: 'signIn.errors.email',
  phone: 'signIn.errors.phone',
  [statusCodes.SIGN_IN_CANCELLED]: 'signIn.errors.cancelled',
  [statusCodes.IN_PROGRESS]: 'signIn.errors.inProgress',
  [statusCodes.PLAY_SERVICES_NOT_AVAILABLE]:
    'signIn.errors.playServicesNotAvailable',
  'User not found': 'signIn.errors.email',
}
