export type RootStackParams = {
  validateOtpCode: {
    type: AuthFlowType
    phoneNumber: number
    pinId: string
    isRegistered: boolean
    phoneCountry: string
    referralCode?: string
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
}
