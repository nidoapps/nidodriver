import {
  GetActiveTrip,
  GetActiveTripByDriverId,
  GetHistoryTripsByDriverId,
} from '@/services/trips'
import { ActionType } from '@/store/actions/base-action'
import {
  setActiveTripAction,
  setAssignedTripsAction,
  setHistoryTripsAction,
  setLoadingHistoryTripsAction,
} from '@/store/actions/trip'
import { setActiveTrip } from '@/store/reducers/trip'

export const useGetTrips = (dispatch: (action: ActionType) => void) => {
  const getTripsByDriverId = async (driverId: string) => {
    try {
      const response = await GetActiveTripByDriverId(driverId)
      if (response) {
        dispatch(setAssignedTripsAction(response || []))
      }
    } catch (error) {
      dispatch(setAssignedTripsAction([]))
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

  const getActiveTrip = async (tripId: string) => {
    try {
      const response = await GetActiveTrip(tripId)
      dispatch(setActiveTripAction(response))
      return response
    } catch (error) {
      console.log('error', error)
      return false
    }
  }

  return { getTripsByDriverId, getHistoryTripsByDriverId, getActiveTrip }
}
