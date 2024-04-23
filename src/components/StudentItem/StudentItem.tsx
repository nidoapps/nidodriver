import {
  Button,
  Icon,
  IconElement,
  List,
  ListItem,
} from '@ui-kitten/components'
import React from 'react'
import { View, Text } from 'react-native'

interface StudentItemProps {
  name: string
}

const StudentItem = () => {
  return (
    <ListItem>
      <Text>student</Text>
    </ListItem>
  )
}

export default StudentItem
