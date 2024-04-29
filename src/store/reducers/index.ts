import { setIsAuth } from './operations'
import { SET_IS_AUTH } from '../actions'
import { ActionType } from '../actions/base-action'

import { DriversState } from '@/models/state'

const reducers: {
  [type: string]: (draftState: DriversState, action: object) => void
} = {
  [SET_IS_AUTH]: setIsAuth,
}

export const combinedReducers = (state: DriversState, action: ActionType) => {
  reducers[action.type](state, action)
}
