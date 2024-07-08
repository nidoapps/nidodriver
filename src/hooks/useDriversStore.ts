import { useEffect } from 'react'
import { useImmerReducer } from 'use-immer'

import { useHandleAuthorization } from './auth/useHandleAuthorization'

import { storage } from '@/App'
import { AssignedTrips } from '@/mocks/stops'
import { DriversState } from '@/models/state'
import { combinedReducers } from '@/store/reducers'

export const useDriversStore = () => {
  const initialState: DriversState = {
    assignedTrips: AssignedTrips,
    isAuth: false,
    startedTrip: false,
  }
  const [state, dispatch] = useImmerReducer(combinedReducers, initialState)

  async function loadInitialState() {
    const authToken = storage.getString('authToken')
    state.isAuth = !!authToken || false
  }
  useEffect(() => {
    loadInitialState()
  }, [])

  const hooks = {
    ...useHandleAuthorization(dispatch),
  }
  return {
    state,
    dispatch,
    hooks,
  }
}
