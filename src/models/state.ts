export interface DriversState {
  assignedTrips?: object[]
  isAuth?: boolean
  startedTrip?: boolean
  loadingAuth?: boolean
  driverData?: any
  loadingHistoryTrips?: boolean
  historyTrips?: any[]
  activeTrip?: any
}
