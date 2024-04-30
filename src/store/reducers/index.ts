import { setIsAuth, setStartedTrip } from './operations'
import { SET_IS_AUTH, SET_STARTED_TRIP } from '../actions'
import { ActionType } from '../actions/base-action'

import { DriversState } from '@/models/state'

const reducers: {
  [type: string]: (draftState: DriversState, action: object) => void
} = {
  [SET_IS_AUTH]: setIsAuth,
  [SET_STARTED_TRIP]: setStartedTrip,
}

export const combinedReducers = (state: DriversState, action: ActionType) => {
  reducers[action.type](state, action)
}
