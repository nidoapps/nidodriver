import GetLocation from 'react-native-get-location'

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
    if (status === TripStatus.inProgress) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then((location) => {
          console.log('location', location)
        })
        .catch((error) => {
          const { code, message } = error
          console.warn(code, message)
        })
    }
    dispatch(setActiveTripAction(null))
    dispatch(setStartedTripAction(null))
    const response = await ChangeTripStatus(tripId, status)
    if (response && response.status === TripStatus.completed) {
      dispatch(setCompletedTripAction(response))
      await getTripsByDriverId(driverId || state.driverData?.driverId)
      dispatch(setActiveTripAction(null))
      dispatch(setStartedTripAction(null))
      return response
    } else {
      await getActiveTrip(state?.driverData?.driverId || driverId)
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
