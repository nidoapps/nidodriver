import { Icon } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useMemo, useRef } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
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
    <SafeAreaView className="flex flex-1 bg-neutral-50">
      <View className="">
        {startedTrip ? <StopsList /> : <NotStartedTrip />}
      </View>
    </SafeAreaView>
  )
}

export default Home
