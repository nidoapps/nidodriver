import { Button, Icon } from '@ui-kitten/components'
import React from 'react'
import { StatusBar, View, Text } from 'react-native'

import { Modal } from '@/components/Modal'
import { StudentStopStatus } from '@/constants/common'
import { colors } from '@/themeColors'

interface ModalCheckinEstudentProps {
  handleClose: () => void
  open: boolean
  studentName: string
  handleCheckin: () => void
  status: string
}

const ModalCheckinEstudent = ({
  handleClose,
  open,
  studentName = '',
  handleCheckin,
  status,
}: ModalCheckinEstudentProps) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <View className="px-6 pb-4 items-center justify-between gap-y-4">
        <Text className="text-xl font-semibold">Confirmar Estudiante</Text>
        <Text className="text-lg">{studentName}</Text>
        <View className=" flex-col p-0  gap-y-5 w-full">
          <Button size="giant" status="primary" onPress={handleCheckin}>
            <Text className="text-xl">Confirmar</Text>
          </Button>
          <Button appearance="ghost" size="giant" onPress={handleClose}>
            <Text>Volver</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

export default ModalCheckinEstudent
