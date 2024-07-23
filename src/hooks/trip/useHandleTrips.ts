import { useGetTrips } from './useGetTrips'

import { TripStatus } from '@/constants/common'
import { DriversState } from '@/models/state'
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
  setCompletedTripAction,
  setLoadingActiveStopDataAction,
  setStartedTripAction,
} from '@/store/actions/trip'
import { setActiveTripStopData } from '@/store/reducers/trip'

export const useHandleTrips = (
  dispatch: (action: ActionType) => void,
  state: DriversState
) => {
  const { getActiveTrip, getTripsByDriverId } = useGetTrips(dispatch)

  const handleChangeTripStatus = async (
    tripId: string,
    status: string,
    driverId?: number
  ) => {
    dispatch(setActiveTripAction(null))
    dispatch(setStartedTripAction(null))
    const response = await ChangeTripStatus(tripId, status)
    if (response && response.status === TripStatus.completed) {
      dispatch(setActiveTripAction(null))
      dispatch(setStartedTripAction(null))
      await getTripsByDriverId(driverId || state.driverData?.driverId)
      dispatch(setCompletedTripAction(response))
      return response
    } else {
      await getActiveTrip(driverId)

      return dispatch(setStartedTripAction(tripId))
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
    dispatch(setLoadingActiveStopDataAction(true))
    dispatch(setActiveTripStopDataAction(null))
    try {
      const response = await GetTripStopStatus(tripStopId)
      dispatch(setActiveTripStopDataAction(response))
      return response
    } catch (error) {
      console.log('error', error)
      return false
    } finally {
      dispatch(setLoadingActiveStopDataAction(false))
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
