import { Icon } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useEffect } from 'react'
import { SafeAreaView, Text, View, Image } from 'react-native'

import { storage } from '@/App'
import { NotStartedTrip } from '@/components/NotStartedTrip'
import { StopsList } from '@/components/StopsList'
import { TripStatus } from '@/constants/common'
import { useDriversContext } from '@/hooks/useDriversContext'

const StyledIcon = styled(Icon)

const Home = () => {
  const {
    state: { startedTrip, assignedTrips, driverData },
    hooks: { getTripsByDriverId, getDriverProfileData },
  } = useDriversContext()

  const RenderHomeByTripState = {
    [TripStatus.notStarted]: <NotStartedTrip />,
    [TripStatus.started]: <StopsList />,
  }

  useEffect(() => {
    if (!driverData) getDriverProfileData(storage.getString('userId'))
  }, [driverData])

  useEffect(() => {
    if (driverData && !assignedTrips) getTripsByDriverId(driverData.driverId)
  }, [driverData, assignedTrips])

  return (
    <SafeAreaView className="flex  bg-neutral-50 justify-between">
      <View className="flex justify-center items-center">
        <Text className="font-semibold text-xl">Nido</Text>
      </View>
      {startedTrip ? <StopsList /> : <NotStartedTrip />}
    </SafeAreaView>
  )
}

export default Home
