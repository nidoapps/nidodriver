import { Card } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React from 'react'
import { View, Text, Animated, Image } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import {
  RectButton,
  ScrollView,
  Swipeable,
  TouchableOpacity,
} from 'react-native-gesture-handler'

import NidoLogoBlue from '@/assets/images/nido-logo-blue.png'
import { TripDirection, TripDirectionText } from '@/constants/common'
import { useDriversContext } from '@/hooks/useDriversContext'
import { t } from '@/locales/i18n'
import { setStartedTripAction } from '@/store/actions/trip'
import { colors } from '@/themeColors'

const StyledRectButton = styled(RectButton)
const StyledIcon = styled(Icon)

const NotStartedTrip = ({}) => {
  const {
    state: { assignedTrips },
    hooks: { handleChangeTripStatus },
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
      <View className="h-1/3 bg-neutral-100 items-center justify-center">
        <Image source={NidoLogoBlue} className="h-20 w-20" resizeMode="cover" />
        <Text className="text-2xl font-semibold"> Rutas asignadas</Text>
      </View>
      <ScrollView className="h-2/3">
        {assignedTrips &&
          assignedTrips.length &&
          assignedTrips.map((trip, index) => {
            return (
              <TouchableOpacity key={index}>
                <Swipeable
                  key={index}
                  dragOffsetFromLeftEdge={index === 0 ? 0 : Number.MAX_VALUE}
                  renderLeftActions={renderLeftActions}
                  onSwipeableOpen={(direction: 'left' | 'right') => {
                    if (direction === 'left')
                      dispatch(setStartedTripAction(trip.tripId))
                    handleChangeTripStatus(trip.tripId, 'InProgress')
                  }}>
                  <View
                    className={`bg-white flex-row px-4 py-5 my-1 border border-neutral-200 justify-between items-center ${index && 'opacity-60'}`}>
                    <View className="flex  gap-y-1">
                      <Text className="text-2xl font-medium">
                        {trip?.route?.name || ''}
                      </Text>
                      <Text>
                        {t('common.direction')}:{' '}
                        {t(`${TripDirectionText[trip.route.direction]}`)}
                      </Text>
                      {/* <Text>Origen: {trip.stops[0].title}</Text> */}
                      <Text>
                        Destino:{' '}
                        {trip?.route?.direction === TripDirection.going
                          ? trip?.school?.name
                          : trip.stops[trip.stops.length - 1]?.name}{' '}
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
      </ScrollView>
    </View>
  )
}

export default NotStartedTrip
