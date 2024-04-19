type AuthFlowType = 'SIGN_IN' | 'SIGN_UP' | 'UPDATE';

interface CustomerSignUpData {
  name: string;
  lastName: string;
  email: string;
  docType: string;
  docValue: string;
}
