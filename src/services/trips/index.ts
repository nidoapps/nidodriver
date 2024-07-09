import { get } from '../axios/axios'

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
