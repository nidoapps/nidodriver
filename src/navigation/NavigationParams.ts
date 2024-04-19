type RootStackParams = {
  validateOtpCode: {
    type: AuthFlowType;
    phoneNumber: number;
    pinId: string;
    isRegistered: boolean;
    phoneCountry: string;
    referralCode?: string;
  };
  changePassword: {};
  splash: {};
  signUpOtp: {
    pinId: string;
    pin: string;
    customerData?: CustomerSignUpData;
  };
  main: {};
  signin: {};
  otpCode: {};
};
