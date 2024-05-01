import { Icon } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useMemo, useRef } from 'react'
import { SafeAreaView, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { NotStartedTrip } from '@/components/NotStartedTrip'
import { StopsList } from '@/components/StopsList'
import { TripStatus } from '@/constants/common'
import { useDriversContext } from '@/hooks/useDriversContext'

const StyledIcon = styled(Icon)

const Home = () => {
  const {
    state: { startedTrip },
  } = useDriversContext()

  const RenderHomeByTripState = {
    [TripStatus.notStarted]: <NotStartedTrip />,
    [TripStatus.started]: <StopsList />,
  }

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
