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
