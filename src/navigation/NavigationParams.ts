export type RootStackParams = {
  validateOtpCode: {
    type: AuthFlowType;
    phoneNumber: number;
    pinId: string;
    isRegistered: boolean;
    phoneCountry: string;
    referralCode?: string;
  };
  changePassword: object;
  splash: object;
  signUpOtp: {
    pinId: string;
    pin: string;
    customerData?: CustomerSignUpData;
  };
  main: object;
  signin: object;
  otpCode: object;
};
