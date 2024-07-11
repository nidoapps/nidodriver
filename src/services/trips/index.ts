import { get, patch, put } from '../axios/axios'

export const GetActiveTripByDriverId = async (driverId: string) => {
  try {
    const response = await get({
      servicePath: `trips/active/${driverId}`,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const GetHistoryTripsByDriverId = async (
  driverId: string,
  date: string,
  direction: string
) => {
  try {
    const response = await get({
      servicePath: `trips/history/${driverId}/${date}/${direction}`,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const ChangeTripStatus = async (tripId: string, status: string) => {
  try {
    const response = await put({
      servicePath: `trips/change-status`,
      data: {
        id: tripId,
        status,
      },
    })
    return response
  } catch (error) {
    throw error
  }
}

export const GetActiveTrip = async (
  tripId: string,
  driverId: string,
  status: string
) => {
  try {
    const response = await get({
      servicePath: `trips/${driverId}/info-of-passengers?tripId=${tripId}&status=${status}`,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const ChangeStopStatus = async (stopId: string, status: string) => {
  try {
    const response = await put({
      servicePath: `trip-stop/change-status`,
      data: {
        id: stopId,
        status,
      },
    })
    return response
  } catch (error) {
    throw error
  }
}

export const ChangePassengerStopStatus = async (
  passengerId: number,
  status: string
) => {
  try {
    const response = await put({
      servicePath: `trip-stop-passenger/change-status-by-driver`,
      data: {
        id: passengerId,
        status,
      },
    })
    return response
  } catch (error) {
    throw error
  }
}
