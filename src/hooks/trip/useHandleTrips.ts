import {
  ChangePassengerStopStatus,
  ChangeStopStatus,
  ChangeTripStatus,
} from '@/services/trips'
import { ActionType } from '@/store/actions/base-action'
import { setActiveTripAction, setStartedTripAction } from '@/store/actions/trip'

export const useHandleTrips = (dispatch: (action: ActionType) => void) => {
  const handleChangeTripStatus = async (tripId: string, status: string) => {
    dispatch(setActiveTripAction(null))
    dispatch(setStartedTripAction(null))
    try {
      const response = await ChangeTripStatus(tripId, status)
      dispatch(setStartedTripAction(tripId))
      return response
    } catch (error) {
      console.log('error', error)
      return false
    }
  }

  const handleChangeStopStatus = async (stopId: string, status: string) => {
    try {
      const response = await ChangeStopStatus(stopId, status)
      return response
    } catch (error) {
      console.log('error', error)
      return false
    }
  }

  const handleChangePassengerStopStatus = async (passengerId, status) => {
    try {
      const response = await ChangePassengerStopStatus(passengerId, status)
      return response
    } catch (error) {
      console.log('error', error)
      return false
    }
  }

  return {
    handleChangeTripStatus,
    handleChangeStopStatus,
    handleChangePassengerStopStatus,
  }
}
