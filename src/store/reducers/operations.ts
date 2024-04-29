import { ActionType } from '../actions/base-action'

import { DriversState } from '@/models/state'

export const setIsAuth = (state: DriversState, action: ActionType) => {
  state.isAuth = action.payload as boolean
}
