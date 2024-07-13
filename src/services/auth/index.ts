import { get, patch, post, put } from '../axios/axios'
import { ServicesTypes } from '../axios/axios.interface'

export const SendOTP = async (phone: string) => {
  return await post({
    servicePath: 'auth/send-sms',
    data: { phone, type: 'phone' },
  })
    .then((res: any) => {
      if (res && res.status === 'pending') {
        return { sendedOtp: true }
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
    })
}

export const SendOTPEmail = async (email: string) => {
  return await post({
    servicePath: 'auth/send-email',
    data: { email: email.toLowerCase() },
  })
    .then((res: any) => {
      if (res && res.status === 'pending') {
        return { sendedOtp: true }
      } else if (res && res?.error) {
        return {
          error: res.error,
          type: res.type,
        }
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
    })
}

export const VerifyOTP = async (
  phone: string,
  code: string
): Promise<{ authToken: any; userId: any }> => {
  return await post({
    servicePath: 'auth/verify-code',
    data: { phone, code },
  })
    .then((res: any) => {
      console.log('code verification', res)
      if (res && res.status === 'approved') {
        return {
          authToken: res.access_token,
          userId: res.userId,
        }
      } else if (res && res?.error) {
        return {
          error: res.error,
        }
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
      return err.error
    })
}

export const VerifyEmailOTP = async (
  email: string,
  code: string
): Promise<{ authToken: any; userId: any }> => {
  return await post({
    servicePath: 'auth/verify-email-code',
    data: { email: email.toLowerCase(), code },
  })
    .then((res: any) => {
      if (res && res.status === 'approved') {
        return {
          authToken: res.access_token,
          userId: res.userId,
        }
      } else if (res && res?.error) {
        return {
          error: res.error,
        }
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
      return err.error
    })
}

export const EmailLogin = async (
  email: string,
  password: string
): Promise<{ authToken: any; userId: any }> => {
  return await post({
    servicePath: 'auth/login',
    data: { username: email.toLowerCase(), password },
  })
    .then((res: any) => {
      if (res && res.access_token) {
        return { authToken: res.access_token, userId: res.userId }
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
    })
}

export const GoogleLogin = async (
  email: string,
  name: string
): Promise<{ authToken: any; userId: any }> => {
  return await post({
    servicePath: 'auth/google-login',
    data: { username: email.toLowerCase(), name },
  })
    .then((res: any) => {
      if (res && res.access_token) {
        return { authToken: res.access_token, userId: res.userId }
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
    })
}

export const GetDriverProfileData = async (userId: number) => {
  return await get({
    servicePath: `drivers/${userId}/user`,
  })
    .then((res: any) => {
      return res
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
    })
}

export const UpdateDriverProfile = async (driverId: number, data: any) => {
  return await patch({
    servicePath: `drivers/${driverId}`,
    data,
  })
    .then((res: any) => {
      return res
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
    })
}
