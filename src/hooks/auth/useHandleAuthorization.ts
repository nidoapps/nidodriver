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
  // const { getUserProfileData } = useHandleDriverData(dispatch)

  const handleCompleteLogin = async (
    response: any,
    completeLoginAction: (route: string) => void
  ) => {
    dispatch(setIsAuthAction(true))

    if (response.authToken && response.userId) {
      storage.set('authToken', response.authToken)
      storage.set('userId', response.userId.toString())
      // const userData = await getUserProfileData(response.userId)

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
    } catch (error) {
      // Handle error
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
      if (response)
        return await handleCompleteLogin(response, completeLoginAction)
    } catch (error) {
    } finally {
      dispatch(setLoadingAuthAction(false))
    }
  }

  const handleGoogleSignIn = async (completeLoginAction: (route) => void) => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      if (userInfo && userInfo.user) {
        await GoogleLogin(userInfo.user.email, String(userInfo.user.name)).then(
          (response) => {
            if (response && response.authToken && response.authToken)
              handleCompleteLogin(response, completeLoginAction)
          }
        )
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated')
      } else {
        console.log('Something went wrong:', error)
      }
    }
  }

  const handleSignOut = () => {
    storage.set('authToken', '')
    storage.set('userId', '')

    dispatch(setIsAuthAction(null))
  }

  return {
    handleEmailLogin,
    handleSignOut,
    handlePhoneNumberLogin,
    handleGoogleSignIn,
  }
}
