import { baseAction } from './base-action'

export const SET_IS_AUTH = 'SET_IS_AUTH'

export const setIsAuthAction = (payload: any) =>
  baseAction(SET_IS_AUTH, payload)

export const SET_STARTED_TRIP = 'SET_STARTED_TRIP'

export const setStartedTripAction = (payload: any) =>
  baseAction(SET_STARTED_TRIP, payload)
