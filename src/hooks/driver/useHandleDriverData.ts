import { OneSignal } from 'react-native-onesignal'

import { GetDriverProfileData } from '@/services/auth'
import { ActionType } from '@/store/actions/base-action'
import { setDriverDataAction } from '@/store/actions/driver'

export const useHandleDriverData = (dispatch: (action: ActionType) => void) => {
  const getDriverProfileData = async (userId: number) => {
    try {
      const userData = await GetDriverProfileData(Number(userId))
      OneSignal.login(String(userData?.userId))
      dispatch(setDriverDataAction(userData))
      return userData
    } catch (error) {
      console.log('get user data error ', error)
      return false
    }
  }

  return { getDriverProfileData }
}
