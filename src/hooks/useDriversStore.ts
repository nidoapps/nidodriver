import { useImmerReducer } from 'use-immer'

import { AssignedTrips } from '@/mocks/stops'
import { DriversState } from '@/models/state'
import { combinedReducers } from '@/store/reducers'

export const useDriversStore = () => {
  const initialState: DriversState = {
    assignedTrips: AssignedTrips,
  }
  const [state, dispatch] = useImmerReducer(combinedReducers, initialState)
  return {
    state,
    dispatch,
  }
}
