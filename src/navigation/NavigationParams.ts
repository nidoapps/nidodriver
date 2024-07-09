export type RootStackParams = {
  validateOtpCode: {
    type: AuthFlowType
    phoneNumber: number
    pinId: string
    phoneCountry: string
    email?: string
  }
  changePassword: object
  splash: object
  main: object
  signIn: object
  otpCode: object
  home: object
  stopDetail: {
    stopId: string
    stopTitle: string
  }
  modalCheckin: object
  students: object
  routes: object
  studentDetail?: {
    stopId: string
    stopTitle: string
  }
}
