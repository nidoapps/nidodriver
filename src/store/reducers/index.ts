import { setIsAuth, setLoadingAuth } from './operations'
import { setAssignedTrips, setStartedTrip } from './trip'
import { SET_IS_AUTH, SET_LOADING_AUTH } from '../actions'
import { ActionType } from '../actions/base-action'
import { SET_ASSIGNED_TRIPS, SET_STARTED_TRIP } from '../actions/trip'

import { DriversState } from '@/models/state'

const reducers: {
  [type: string]: (draftState: DriversState, action: object) => void
} = {
  [SET_IS_AUTH]: setIsAuth,
  [SET_LOADING_AUTH]: setLoadingAuth,
  [SET_STARTED_TRIP]: setStartedTrip,
  [SET_ASSIGNED_TRIPS]: setAssignedTrips,
}

export const combinedReducers = (state: DriversState, action: ActionType) => {
  reducers[action.type](state, action)
}
