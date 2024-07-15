import { useFocusEffect } from '@react-navigation/native'
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
    state: { startedTrip, assignedTrips, driverData, activeTrip },
    hooks: { getTripsByDriverId, getDriverProfileData, getActiveTrip },
  } = useDriversContext()

  // const RenderHomeByTripState = {
  //   [TripStatus.notStarted]: <NotStartedTrip />,
  //   [TripStatus.started]: <StopsList />,
  // }

  useEffect(() => {
    if (!driverData) getDriverProfileData(storage.getString('userId'))
  }, [driverData])

  useEffect(() => {
    if (driverData && !assignedTrips) getTripsByDriverId(driverData.driverId)
  }, [driverData, assignedTrips])

  useFocusEffect(
    React.useCallback(() => {
      getTripsByDriverId(driverData?.driverId)
    }, [driverData])
  )

  useFocusEffect(
    React.useCallback(() => {
      getActiveTrip()
    }, [driverData])
  )

  return (
    <SafeAreaView className="flex  bg-neutral-50 justify-between">
      <View className="flex justify-center items-center">
        <Text className="font-semibold text-xl">Nido</Text>
      </View>
      {startedTrip ||
      (activeTrip && activeTrip?.status === TripStatus.inProgress) ? (
        <StopsList />
      ) : (
        <NotStartedTrip
          assignedTrips={assignedTrips || []}
          driverId={driverData?.driverId}
        />
      )}
    </SafeAreaView>
  )
}

export default Home
