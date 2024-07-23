import { OneSignal } from 'react-native-onesignal'

import { UpdateDriverProfile } from './../../services/auth/index'

import { storage } from '@/App'
import { GetDriverProfileData } from '@/services/auth'
import { ActionType } from '@/store/actions/base-action'
import { setDriverDataAction } from '@/store/actions/driver'

export const useHandleDriverData = (dispatch: (action: ActionType) => void) => {
  const getDriverProfileData = async (userId: number) => {
    try {
      const userData = await GetDriverProfileData(Number(userId))
      OneSignal.login(String(userData?.userId))
      dispatch(setDriverDataAction(userData))
      storage.set('driverId', userData?.driverId?.toString())
      return userData
    } catch (error) {
      console.log('get user data error ', error)
      return false
    }
  }

  const updateDriverProfileData = async (driverId: number, data: any) => {
    try {
      const response = await UpdateDriverProfile(driverId, data)
      dispatch(setDriverDataAction(response))

      return response
    } catch (error) {
      console.log('error', error)
      return false
    }
  }

  return { getDriverProfileData, updateDriverProfileData }
}
