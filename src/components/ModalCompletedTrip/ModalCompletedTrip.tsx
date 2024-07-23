import { Button, Icon } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React from 'react'
import { View, Text } from 'react-native'

import Modal from '../Modal/Modal'

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
  return (
    <Modal open={open} handleClose={handleClose} maxHeight={70}>
      <View className="flex items-center justify-between">
        <View className="flex justify-center items-center">
          <StyledIcon
            name="checkmark-circle-2"
            fill={colors.success}
            className="w-20 h-20 "
          />
          <Text className="text-2xl font-bold my-4">Ruta completada!</Text>
          <View className="items-start">
            <Text className="text-lg font-medium mb-1">
              Ruta iniciada: {formatDateWithTime(completedTrip.startedAt)}
            </Text>
            <Text className="text-lg font-medium ">
              Ruta finalizada:{' '}
              {formatDateWithTime(
                completedTrip?.completedAt || completedTrip?.cancelledAt
              )}
            </Text>
          </View>
        </View>
        <View>
          <Button size="giant">Continuar</Button>
        </View>
      </View>
    </Modal>
  )
}

export default ModalCompletedTrip
