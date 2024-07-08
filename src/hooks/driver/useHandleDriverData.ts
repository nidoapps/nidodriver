import { OneSignal } from 'react-native-onesignal'

import { ActionType } from '@/store/actions/base-action'
import { setDriverDataAction } from '@/store/actions/driver'

export const useHandleDriverData = (dispatch: (action: ActionType) => void) => {
  const getUserProfileData = async (userId: number) => {
    // try {
    //   const userData = await GetUserProfileData(Number(userId))
    //   OneSignal.login(String(userData?.userId))
    //   dispatch(setDriverDataAction(userData))
    //   return userData
    // } catch (error) {
    //   console.log('get user data error ', error)
    //   return false
    // }
  }

  return { getUserProfileData }
}
