import { DriversState } from '@/models/state'
import { ActionType } from '@/store/actions/base-action'

export const setAssignedTrips = (state: DriversState, action: ActionType) => {
  state.assignedTrips = action.payload as any
}

export const setStartedTrip = (state: DriversState, action: ActionType) => {
  state.startedTrip = action.payload as boolean
}
