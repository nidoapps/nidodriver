import { baseAction } from '../base-action'

export const SET_DRIVER_DATA = 'SET_DRIVER_DATA'

export const setDriverDataAction = (driverData: any) =>
  baseAction(SET_DRIVER_DATA, driverData)
