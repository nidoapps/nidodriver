import { Divider, List } from '@ui-kitten/components'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { stops } from '@/mocks/stops'

const Students = () => {
  const students = stops[0].students
  const renderItem = ({ item, index }: any): React.ReactElement => (
    <View className="px-4 py-6 flex-row justify-between items-center">
      <Text className="text-base font-semibold">{item.name}</Text>
    </View>
  )
  return (
    <SafeAreaView className="bg-white p-2 h-screen">
      <List
        data={students}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default Students
