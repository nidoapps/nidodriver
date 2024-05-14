import { Button, Icon } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React from 'react'
import { View, Text, Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Modal } from '@/components/Modal'
const StyledIcon = styled(Icon)
interface ModalCallContactsProps {
  handleClose: () => void
  open: boolean
  studentName?: string
  contacts: any[]
}

const ModalCallContacts = ({
  handleClose,
  open,
  studentName = '',
  contacts,
}: ModalCallContactsProps) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <View className="p-6 items-center justify-between gap-y-3">
        <Text className="text-lg ">Llamar a contactos de </Text>
        <Text className="text-xl font-semibold">{studentName}</Text>
        <View className=" flex-col p-0 items-center justify-center gap-y-2 mb-2">
          {contacts.map((contact, i) => (
            <TouchableOpacity
              className="py-2 gap-y-2"
              key={i}
              onPress={() => Linking.openURL(`tel://${contact.phone}`)}>
              <View className="flex-row justify-between items-center">
                <Text className="text-lg">{contact.name}</Text>
                <StyledIcon name="phone-call" className="w-8 h-6" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Button appearance="ghost" onPress={handleClose}>
          <Text className="text-xl">Cancelar</Text>
        </Button>
      </View>
    </Modal>
  )
}

export default ModalCallContacts
