import { DriversState } from '@/models/state'
import { ActionType } from '@/store/actions/base-action'

export const setDriverData = (state: DriversState, action: ActionType) => {
  state.driverData = action.payload
}
