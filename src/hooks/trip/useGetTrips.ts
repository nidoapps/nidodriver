import { DriversState } from '@/models/state'
import {
  GetActiveTrip,
  GetAssignedTripsByDriverId,
  GetHistoryTripsByDriverId,
} from '@/services/trips'
import { ActionType } from '@/store/actions/base-action'
import {
  setActiveTripAction,
  setAssignedTripsAction,
  setHistoryTripsAction,
  setLoadingHistoryTripsAction,
} from '@/store/actions/trip'

export const useGetTrips = (
  dispatch: (action: ActionType) => void,
  state: DriversState
) => {
  const getTripsByDriverId = async (driverId: string) => {
    try {
      const response = await GetAssignedTripsByDriverId(driverId)
      console.log('earar', response)
      dispatch(setAssignedTripsAction(response || []))
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }

  const getHistoryTripsByDriverId = async (
    driverId: string,
    date: string,
    direction: string
  ) => {
    dispatch(setLoadingHistoryTripsAction(true))
    dispatch(setHistoryTripsAction([]))
    try {
      const response = await GetHistoryTripsByDriverId(
        driverId,
        date,
        direction
      )
      dispatch(setHistoryTripsAction(response))
    } catch (error) {
      dispatch(setHistoryTripsAction([]))
    } finally {
      dispatch(setLoadingHistoryTripsAction(false))
    }
  }

  const getActiveTrip = async () => {
    dispatch(setActiveTripAction(null))

    try {
      const response = await GetActiveTrip(state.driverData?.driverId)
      dispatch(setActiveTripAction(response || {}))
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }

  return { getTripsByDriverId, getHistoryTripsByDriverId, getActiveTrip }
}
