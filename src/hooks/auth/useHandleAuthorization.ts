import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'

import { useHandleDriverData } from '../driver/useHandleDriverData'

import { storage } from '@/App'
import { GoogleLogin, VerifyEmailOTP, VerifyOTP } from '@/services/auth'
import { setIsAuthAction, setLoadingAuthAction } from '@/store/actions'
import { ActionType } from '@/store/actions/base-action'
import { setDriverDataAction } from '@/store/actions/driver'

export const useHandleAuthorization = (
  dispatch: (action: ActionType) => void
) => {
  const { getDriverProfileData } = useHandleDriverData(dispatch)

  const handleCompleteLogin = async (
    response: any,
    completeLoginAction: (route: string) => void
  ) => {
    dispatch(setIsAuthAction(true))

    if (response.authToken && response.userId) {
      storage.set('authToken', response.authToken)
      storage.set('userId', response.userId.toString())
      await getDriverProfileData(response.userId)

      return completeLoginAction('main')
    }
  }

  const handleEmailLogin = async (
    email: string,
    code: string,
    completeLoginAction: (route) => void
  ) => {
    dispatch(setLoadingAuthAction(true))

    try {
      const response = await VerifyEmailOTP(email, code)
      if (response)
        return await handleCompleteLogin(response, completeLoginAction)
      else throw new Error('Invalid email code')
    } catch (error) {
      throw error
    } finally {
      dispatch(setLoadingAuthAction(false))
    }
  }

  const handlePhoneNumberLogin = async (
    phoneNumber: string,
    code: string,
    completeLoginAction: (route) => void
  ) => {
    dispatch(setLoadingAuthAction(true))

    try {
      const response = await VerifyOTP(phoneNumber, code)
      if (response) {
        return await handleCompleteLogin(response, completeLoginAction)
      } else {
        throw new Error('Invalid phone code')
      }
    } catch (error) {
      throw error
    } finally {
      dispatch(setLoadingAuthAction(false))
    }
  }

  const handleGoogleSignIn = async (
    completeLoginAction: (route) => void,
    setError: (err) => void
  ) => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      if (userInfo && userInfo.user) {
        return await GoogleLogin(
          userInfo.user.email,
          String(userInfo.user.name)
        ).then((response) => {
          if (response && response.authToken) {
            handleCompleteLogin(response, completeLoginAction)
          } else {
            return setError('email')
          }
        })
      }
    } catch (error) {
      throw error?.code
    }
  }

  const handleSignOut = () => {
    storage.set('authToken', '')
    storage.set('userId', '')

    dispatch(setLoadingAuthAction(false))
    dispatch(setIsAuthAction(false))
    dispatch(setDriverDataAction(null))
  }

  return {
    handleEmailLogin,
    handleSignOut,
    handlePhoneNumberLogin,
    handleGoogleSignIn,
  }
}
