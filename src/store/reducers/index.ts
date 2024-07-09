import { setDriverData } from './driver'
import { setIsAuth, setLoadingAuth } from './operations'
import { setAssignedTrips, setHistoryTrips, setStartedTrip } from './trip'
import { SET_IS_AUTH, SET_LOADING_AUTH } from '../actions'
import { ActionType } from '../actions/base-action'
import { SET_DRIVER_DATA } from '../actions/driver'
import {
  SET_ASSIGNED_TRIPS,
  SET_HISTORY_TRIPS,
  SET_LOADING_HISTORY_TRIPS,
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
  [SET_LOADING_HISTORY_TRIPS]: setHistoryTrips,
}

export const combinedReducers = (state: DriversState, action: ActionType) => {
  reducers[action.type](state, action)
}
