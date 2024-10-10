import { Card, List } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React from 'react'
import { View, Text, Animated, Image } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import {
  RectButton,
  Swipeable,
  TouchableOpacity,
} from 'react-native-gesture-handler'

import NidoLogoBlue from '@/assets/images/nido-logo-blue.png'
import { TripDirectionText } from '@/constants/common'
import { useDriversContext } from '@/hooks/useDriversContext'
import { t } from '@/locales/i18n'
import { colors } from '@/themeColors'

const StyledRectButton = styled(RectButton)
const StyledIcon = styled(Icon)

const NotStartedTrip = ({ assignedTrips, driverId }) => {
  const {
    hooks: { handleChangeTripStatus },
  } = useDriversContext()

  const renderLeftActions = () => {
    return (
      <StyledRectButton className="bg-teal-500 my-1 justify-center items-center flex-1">
        <>
          <Animated.Text className="!text-white text-xl font-semibold ">
            Iniciando Ruta
          </Animated.Text>
        </>
      </StyledRectButton>
    )
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity key={index}>
        <Swipeable
          key={index}
          dragOffsetFromLeftEdge={0}
          renderLeftActions={renderLeftActions}
          onSwipeableOpen={(direction: 'left' | 'right') => {
            if (direction === 'left') {
              return handleChangeTripStatus(item.tripId, 'InProgress', driverId)
            }
          }}>
          <View
            className={`bg-white flex-row px-4 py-5 my-1 border border-neutral-200 justify-between items-center ${index && 'opacity-90'}`}>
            <View className="flex  gap-y-1">
              <Text className="text-2xl font-medium">
                {item?.route?.name || ''}
              </Text>
              <Text>
                {t('common.direction')}:{' '}
                {t(`${TripDirectionText[item.route.direction]}`)}
              </Text>
              <Text>Paradas: {item.stops.length}</Text>
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
  }

  return (
    <View className="flex justify-between">
      <View className="h-1/3 bg-neutral-100 items-center justify-center">
        <Image source={NidoLogoBlue} className="h-20 w-20" resizeMode="cover" />
        <Text className="text-2xl font-semibold"> Rutas asignadas</Text>
      </View>
      <View className="h-2/3">
        {assignedTrips && assignedTrips.length ? (
          <List data={assignedTrips || []} renderItem={renderItem} />
        ) : (
          <View className="flex items-center justify-center h-full">
            <Text className="text-xl font-semibold">
              No hay rutas asignadas
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default NotStartedTrip
