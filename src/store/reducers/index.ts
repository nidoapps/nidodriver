import { setDriverData } from './driver'
import { setIsAuth, setLoadingAuth } from './operations'
import {
  setActiveTrip,
  setActiveTripStopData,
  setAssignedTrips,
  setCompletedTrip,
  setHistoryTrips,
  setLoadingActiveStopData,
  setLoadingHistoryTrips,
  setPassengersInfo,
  setStartedTrip,
} from './trip'
import { SET_IS_AUTH, SET_LOADING_AUTH } from '../actions'
import { ActionType } from '../actions/base-action'
import { SET_DRIVER_DATA } from '../actions/driver'
import {
  SET_ACTIVE_TRIP,
  SET_ACTIVE_TRIP_STOP_DATA,
  SET_ASSIGNED_TRIPS,
  SET_COMPLETED_TRIP,
  SET_HISTORY_TRIPS,
  SET_LOADING_ACTIVE_STOP_DATA,
  SET_LOADING_HISTORY_TRIPS,
  SET_PASSENGERS_INFO,
  SET_STARTED_TRIP,
} from '../actions/trip'

import { DriversState } from '@/models/state'

const reducers: {
  [type: string]: (draftState: DriversState, action: object) => void
} = {
  [SET_IS_AUTH]: setIsAuth,
  [SET_LOADING_AUTH]: setLoadingAuth,
  [SET_STARTED_TRIP]: setStartedTrip,
  [SET_ASSIGNED_TRIPS]: setAssignedTrips,
  [SET_DRIVER_DATA]: setDriverData,
  [SET_HISTORY_TRIPS]: setHistoryTrips,
  [SET_LOADING_HISTORY_TRIPS]: setLoadingHistoryTrips,
  [SET_ACTIVE_TRIP]: setActiveTrip,
  [SET_ACTIVE_TRIP_STOP_DATA]: setActiveTripStopData,
  [SET_PASSENGERS_INFO]: setPassengersInfo,
  [SET_LOADING_ACTIVE_STOP_DATA]: setLoadingActiveStopData,
  [SET_COMPLETED_TRIP]: setCompletedTrip,
}

export const combinedReducers = (state: DriversState, action: ActionType) => {
  reducers[action.type](state, action)
}
