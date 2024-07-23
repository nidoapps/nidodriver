import { baseAction } from '../base-action'

export const SET_STARTED_TRIP = 'SET_STARTED_TRIP'

export const setStartedTripAction = (payload: any) =>
  baseAction(SET_STARTED_TRIP, payload)

export const SET_ACTIVE_TRIP = 'SET_ACTIVE_TRIP'

export const setActiveTripAction = (activeTrip: any) => {
  return baseAction('SET_ACTIVE_TRIP', activeTrip)
}

export const SET_ASSIGNED_TRIPS = 'SET_ASSIGNED_TRIPS'

export const setAssignedTripsAction = (assignedTrips: any) => {
  return baseAction('SET_ASSIGNED_TRIPS', assignedTrips)
}

export const SET_HISTORY_TRIPS = 'SET_HISTORY_TRIPS'

export const setHistoryTripsAction = (historyTrips: any) => {
  return baseAction('SET_HISTORY_TRIPS', historyTrips)
}

export const SET_LOADING_HISTORY_TRIPS = 'SET_LOADING_HISTORY_TRIPS'

export const setLoadingHistoryTripsAction = (loading: boolean) => {
  return baseAction('SET_LOADING_HISTORY_TRIPS', loading)
}

export const SET_ACTIVE_TRIP_STOP_DATA = 'SET_ACTIVE_TRIP_STOP_DATA'

export const setActiveTripStopDataAction = (payload: any) => {
  return baseAction('SET_ACTIVE_TRIP_STOP_DATA', payload)
}

export const SET_PASSENGERS_INFO = 'SET_PASSENGERS_INFO'

export const setPassengersInfoAction = (payload: any) => {
  return baseAction('SET_PASSENGERS_INFO', payload)
}

export const SET_LOADING_ACTIVE_STOP_DATA = 'SET_LOADING_ACTIVE_STOP_DATA'

export const setLoadingActiveStopDataAction = (payload: any) => {
  return baseAction('SET_LOADING_ACTIVE_STOP_DATA', payload)
}

export const SET_COMPLETED_TRIP = 'SET_COMPLETED_TRIP'

export const setCompletedTripAction = (payload: any) => {
  return baseAction('SET_COMPLETED_TRIP', payload)
}
