import { useFocusEffect } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useEffect } from 'react'
import { Platform, SafeAreaView, Text, View } from 'react-native'

import { storage } from '@/App'
import { ModalCompletedTrip } from '@/components/ModalCompletedTrip'
import { NotStartedTrip } from '@/components/NotStartedTrip'
import { StopsList } from '@/components/StopsList'
import { TripStatus } from '@/constants/common'
import { useDriversContext } from '@/hooks/useDriversContext'
import { setCompletedTripAction } from '@/store/actions/trip'

const Home = () => {
  const {
    dispatch,
    state: {
      startedTrip,
      assignedTrips,
      driverData,
      activeTrip,
      completedTrip,
    },
    hooks: { getTripsByDriverId, getDriverProfileData, getActiveTrip },
  } = useDriversContext()

  useEffect(() => {
    getDriverProfileData(storage.getString('userId'))
  }, [])
  useFocusEffect(
    React.useCallback(() => {
      getTripsByDriverId(driverData?.driverId)
    }, [driverData])
  )

  useFocusEffect(
    React.useCallback(() => {
      getActiveTrip(driverData?.driverId)
    }, [driverData])
  )

  return (
    <SafeAreaView
      className={`flex  bg-neutral-50 justify-between ${Platform.OS !== 'ios' && 'pt-10'}`}>
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
      <ModalCompletedTrip
        open={!!completedTrip}
        handleClose={() => {
          dispatch(setCompletedTripAction(null))
        }}
        completedTrip={completedTrip}
      />
    </SafeAreaView>
  )
}

export default Home
