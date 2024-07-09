import {
  GetActiveTripByDriverId,
  GetHistoryTripsByDriverId,
} from '@/services/trips'
import { ActionType } from '@/store/actions/base-action'
import {
  setAssignedTripsAction,
  setHistoryTripsAction,
  setLoadingHistoryTripsAction,
} from '@/store/actions/trip'

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
    try {
      const response = await GetHistoryTripsByDriverId(
        driverId,
        date,
        direction
      )
      if (response) {
        dispatch(setHistoryTripsAction(response || []))
      }
    } catch (error) {
      dispatch(setHistoryTripsAction([]))
    } finally {
      dispatch(setLoadingHistoryTripsAction(false))
    }
  }

  return { getTripsByDriverId, getHistoryTripsByDriverId }
}
