import { Card } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React from 'react'
import { View, Text, Animated, Alert } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import {
  RectButton,
  Swipeable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'

import { useDriversContext } from '@/hooks/useDriversContext'
import { setStartedTripAction } from '@/store/actions'
import { colors } from '@/themeColors'

const StyledRectButton = styled(RectButton)
const StyledIcon = styled(Icon)

const NotStartedTrip = () => {
  const {
    state: { assignedTrips },
    dispatch,
  } = useDriversContext()

  const iconRef = React.useRef()
  const infiniteAnimationIconRef: React.RefObject<Icon> = React.createRef()

  const renderLeftActions = (progress, dragX) => {
    // const trans = dragX.interpolate({
    //   inputRange: [0, 0, 50, 51],
    //   outputRange: [-10, 0, 20, 0],
    // })
    return (
      <StyledRectButton
        className="bg-teal-500 my-1 justify-center items-center flex-1"
        // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <>
          <Animated.Text
            className="!text-white text-xl font-semibold "
            // style={[
            //   {
            //     transform: [{ translateX: trans }],
            //   },
            // ]}
          >
            Iniciando Ruta
          </Animated.Text>
        </>
      </StyledRectButton>
    )
  }

  return (
    <View className="flex justify-between">
      <View className="h-1/2 bg-neutral-100 items-center justify-center">
        <Text className="text-3xl font-semibold"> Rutas asignadas</Text>
      </View>
      <View className="   ">
        {assignedTrips.map((trip, index) => {
          return (
            <TouchableOpacity key={index}>
              <Swipeable
                key={index}
                dragOffsetFromLeftEdge={index === 0 ? 0 : Number.MAX_VALUE}
                renderLeftActions={renderLeftActions}
                onSwipeableOpen={(
                  direction: 'left' | 'right',
                  swipeable: Swipeable
                ) => {
                  if (direction === 'left') dispatch(setStartedTripAction(true))
                }}>
                <View
                  className={`bg-white flex-row px-4 py-8 my-1 border border-neutral-200 justify-between items-center ${index && 'opacity-60'}`}>
                  <View className="flex  gap-y-1">
                    <Text className="text-2xl font-medium">{trip.title}</Text>
                    <Text>Origen: {trip.stops[0].title}</Text>
                    <Text>
                      Destino: {trip.stops[trip.stops.length - 1].title}
                    </Text>
                    <Text>Paradas: {trip.stops.length}</Text>
                  </View>
                  <StyledIcon
                    name="arrowhead-right-outline"
                    className="w-12 h-12"
                    fill={index ? colors.darkGrey2 : colors.primary}
                  />
                </View>
              </Swipeable>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default NotStartedTrip
