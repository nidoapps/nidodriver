import GetLocation from 'react-native-get-location'

import { SendLocation } from '@/services/trips'

export const getLocation = async () => {
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  })
    .then(async (location) => {
      const { latitude, longitude } = location

      await SendLocation({
        lat: latitude,
        lng: longitude,
        battery_charge: 0,
      })
    })
    .catch((error) => {
      const { code, message } = error
      console.warn(code, message)
    })
}
