export interface DriversState {
  assignedTrips?: object[]
  isAuth?: boolean
  startedTrip?: boolean
  loadingAuth?: boolean
  driverData?: object
  loadingHistoryTrips?: boolean
  historyTrips?: object[]
  activeTrip?: object
}
