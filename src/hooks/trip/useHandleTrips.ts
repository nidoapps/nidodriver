import {
  ChangePassengerStopStatus,
  ChangeStopStatus,
  ChangeTripStatus,
  GetTripStopStatus,
} from '@/services/trips'
import { ActionType } from '@/store/actions/base-action'
import {
  setActiveTripAction,
  setActiveTripStopDataAction,
  setStartedTripAction,
} from '@/store/actions/trip'
import { setActiveTripStopData } from '@/store/reducers/trip'

export const useHandleTrips = (dispatch: (action: ActionType) => void) => {
  const handleChangeTripStatus = async (tripId: string, status: string) => {
    dispatch(setActiveTripAction(null))
    dispatch(setStartedTripAction(null))
    try {
      await ChangeTripStatus(tripId, status)
      dispatch(setStartedTripAction(tripId))
    } catch (error) {
      console.log('error', error)
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

  const getTripStopData = async (tripStopId: string) => {
    try {
      const response = await GetTripStopStatus(tripStopId)
      dispatch(setActiveTripStopDataAction(response))
      return response
    } catch (error) {
      console.log('error', error)
      return false
    }
  }

  const handleChangePassengerStopStatus = async (
    passengerId,
    status,
    tripStopId
  ) => {
    try {
      const response = await ChangePassengerStopStatus(passengerId, status)
      if (response) {
        await getTripStopData(tripStopId)
      }
    } catch (error) {
      console.log('error', error)
      return false
    }
  }

  return {
    handleChangeTripStatus,
    handleChangeStopStatus,
    handleChangePassengerStopStatus,
    getTripStopData,
  }
}
