import { useEffect } from 'react'
import { useImmerReducer } from 'use-immer'

import { useHandleAuthorization } from './auth/useHandleAuthorization'
import { useHandleDriverData } from './driver/useHandleDriverData'
import { useGetTrips } from './trip/useGetTrips'
import { useHandleTrips } from './trip/useHandleTrips'

import { storage } from '@/App'
import { DriversState } from '@/models/state'
import { combinedReducers } from '@/store/reducers'

export const useDriversStore = () => {
  const initialState: DriversState = {
    assignedTrips: undefined,
    isAuth: false,
    driverData: undefined,
    loadingHistoryTrips: false,
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
    ...useGetTrips(dispatch, state),
    ...useHandleDriverData(dispatch),
    ...useHandleTrips(dispatch, state),
  }
  return {
    state,
    dispatch,
    hooks,
  }
}
