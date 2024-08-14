import { Button } from '@ui-kitten/components'
import React from 'react'
import { StatusBar, View, Text } from 'react-native'

import { Modal } from '@/components/Modal'
import { StudentStopStatus } from '@/constants/common'

interface ModalCancelEstudentProps {
  handleClose: () => void
  open: boolean
  studentName: string
  handleCheckin: () => void
  status: string
}

const ModalCancelEstudent = ({
  handleClose,
  open,
  studentName = '',
  handleCheckin,
  status,
}: ModalCancelEstudentProps) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <View className="px-6 pb-4 items-center justify-between gap-y-4">
        <Text className="text-xl font-semibold">Cancelar Estudiante</Text>
        <Text className="text-lg">{studentName}</Text>
        <View className=" flex-col p-0  gap-y-5 w-full">
          <Button size="giant" status="danger" onPress={handleCheckin}>
            <Text className="text-xl">Cancelar</Text>
          </Button>
          <Button
            appearance="ghost"
            status="danger"
            size="giant"
            onPress={handleClose}>
            <Text>Volver</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

export default ModalCancelEstudent
