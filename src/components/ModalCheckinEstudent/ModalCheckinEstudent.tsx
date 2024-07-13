import { Button } from '@ui-kitten/components'
import React from 'react'
import { StatusBar, View, Text } from 'react-native'

import { Modal } from '@/components/Modal'

interface ModalCheckinEstudentProps {
  handleClose: () => void
  open: boolean
  studentName: string
  handleCheckin: () => void
}

const ModalCheckinEstudent = ({
  handleClose,
  open,
  studentName = '',
  handleCheckin,
}: ModalCheckinEstudentProps) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <View className="p-6 items-center justify-between gap-y-4">
        <Text className="text-xl font-semibold">Checkin de Estudiante</Text>
        <Text className="text-lg">{studentName}</Text>
        <View className=" flex-col p-0 items-center justify-center gap-y-3">
          <Button size="giant" status="success" onPress={handleCheckin}>
            <Text className="text-xl">Marcar como recogido</Text>
          </Button>
          <Button appearance="ghost" onPress={handleClose}>
            <Text className="text-xl">Cancelar</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

export default ModalCheckinEstudent
