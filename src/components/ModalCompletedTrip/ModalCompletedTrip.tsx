import { Button, Icon } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useMemo } from 'react'
import { View, Text } from 'react-native'

import Modal from '../Modal/Modal'

import { StopStatus, StudentStopStatus } from '@/constants/common'
import { colors } from '@/themeColors'
import { formatDateWithTime } from '@/utils/formatDate'

const StyledIcon = styled(Icon)

interface ModalCompletedTripProps {
  open: boolean
  handleClose: () => void
  completedTrip: any
}

const ModalCompletedTrip = ({
  open,
  handleClose,
  completedTrip,
}: ModalCompletedTripProps) => {
  const { completedStops, completedPassengers, totalPassengers } =
    useMemo(() => {
      const uniquePassengers = Array.from(
        new Map(
          completedTrip?.stops
            .flatMap((stop) => stop.passengers)
            .map((passenger) => [passenger.passengerId, passenger])
        ).values()
      )
      if (completedTrip && completedTrip?.stops)
        return {
          completedStops: completedTrip?.stops.filter(
            (stop) =>
              stop.status === StopStatus.completed ||
              stop.status === StopStatus.cancelled
          ).length,
          completedPassengers: uniquePassengers.filter(
            (passenger: any) =>
              passenger.status === StudentStopStatus.pickedUp ||
              passenger.status === StudentStopStatus.arrived
          ).length,
          totalPassengers: uniquePassengers.length,
        }
    }, [completedTrip]) || {}
  return (
    <Modal open={open} handleClose={handleClose} maxHeight={70}>
      <View className="flex items-center justify-between">
        <View className="flex  mb-10">
          <View className="items-center">
            <StyledIcon
              name="checkmark-circle-2"
              fill={colors.success}
              className="w-20 h-20 "
            />
            <Text className="text-2xl font-bold my-4">Ruta completada!</Text>
          </View>
          <View className="items-start justify-center">
            <Text className="text-lg mb-1 text-neutral-800">
              <StyledIcon
                name="clock"
                fill={colors.success}
                className="w-5 h-5"
              />{' '}
              Ruta iniciada: {formatDateWithTime(completedTrip?.startedAt)}
            </Text>
            <Text className="text-lg  text-neutral-800">
              <StyledIcon
                name="clock"
                fill={colors.success}
                className="w-5 h-5"
              />{' '}
              Ruta finalizada:{' '}
              {formatDateWithTime(
                completedTrip?.completedAt || completedTrip?.cancelledAt
              )}
            </Text>
          </View>
          <View className="gap-2 my-2 justify-center">
            <Text className="text-lg font-regular">
              <StyledIcon
                name="pin"
                fill={colors.success}
                className="w-5 h-5"
              />{' '}
              Paradas completadas: {completedStops} /{' '}
              {completedTrip?.stops?.length}
            </Text>
            <Text className="text-lg font-regular">
              <StyledIcon
                name="person-done"
                fill={colors.success}
                className="w-5 h-5"
              />{' '}
              Pasajeros: {completedPassengers} / {totalPassengers}
            </Text>
          </View>
        </View>
        <View className="w-full flex px-10">
          <Button onPress={() => handleClose()} size="giant">
            Continuar
          </Button>
        </View>
      </View>
    </Modal>
  )
}

export default ModalCompletedTrip
