import { get, patch, put } from '../axios/axios'

export const GetAssignedTripsByDriverId = async (driverId: string) => {
  try {
    const response = await get({
      servicePath: `trips/scheduled/${driverId}`,
    })
    return response
  } catch (error) {
    console.log(error)
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
      servicePath: `trips/history/${driverId}`,
      params: {
        date,
        direction,
      },
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

export const GetActiveTrip = async (driverId: number) => {
  try {
    const response = (await get({
      servicePath: `trips/active/${driverId}`,
    })) as any[]
    return response[0]
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

export const GetTripStopStatus = async (tripStopId: string) => {
  try {
    const response = await get({
      servicePath: `trip-stop/get-status/${tripStopId}`,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const GetPassengersInfoByDriver = async (driverId: number) => {
  try {
    const response = await get({
      servicePath: `trips/${driverId}/info-of-passengers/`,
    })
    return response
  } catch (error) {
    throw error
  }
}
