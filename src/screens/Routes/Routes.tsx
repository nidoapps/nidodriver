import { Divider, Icon, List, Tab, TabBar, Button } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ModalCallContacts } from '@/components/ModalCallContacts'
import { PickupStops } from '@/mocks/PickupStops'
import { colors } from '@/themeColors'

const StyledTabBar = styled(TabBar)
const StyledIcon = styled(Icon)
const Routes = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [callStudentModal, setCallStudentModal] = useState(false)
  const [contactsData, setContactsData] = useState({
    student: '',
    contacts: [],
  })
  const currentIndex = useRef(null)

  const TopTabBar = useCallback(
    () => (
      <StyledTabBar
        className="py-4"
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}>
        <Tab title="Rutas de Ida" />
        <Tab title="Rutas de Vuelta" />
      </StyledTabBar>
    ),
    [selectedTab]
  )

  const RouteStudents = ({ item }) => (
    <View className="px-6 py-4 bg-neutral-50">
      {item.students.map((student, i) => (
        <View key={i} className="flex-row justify-between items-center my-1">
          <Text className="my-2 text-lg">{student.name}</Text>
          <Button
            title=""
            size="small"
            appearance="outline"
            accessoryLeft={<StyledIcon name="phone-call" />}
            onPress={() => {
              setContactsData({
                student: student.name,
                contacts: student.contacts,
              })
              setCallStudentModal(true)
            }}
          />
        </View>
      ))}
    </View>
  )

  const renderItem = ({ item, index }: any): React.ReactElement => (
    <>
      <TouchableOpacity
        onPress={() => {
          setExpanded((prev) => !prev)
          currentIndex.current = index
        }}
        className="px-4 py-6 flex-row justify-between  items-center">
        <View className="flex-row items-center gap-x-2">
          <StyledIcon
            name="arrow-forward-outline"
            className="w-8 h-8"
            fill={colors.primary}
          />
          <View className="flex-col">
            <Text className="text-lg font-semibold">{item.title}</Text>
            <Text className="text-base">{item.address}</Text>
          </View>
        </View>

        <StyledIcon
          name={
            expanded && currentIndex.current === index
              ? 'arrow-ios-upward'
              : 'arrow-ios-downward'
          }
          className="w-8 h-8"
          fill={colors.grey}
        />
      </TouchableOpacity>
      {expanded && currentIndex.current === index && (
        <RouteStudents item={item} />
      )}
    </>
  )

  return (
    <SafeAreaView className="bg-white">
      <TopTabBar />
      <View className="h-full bg-white">
        <List
          ItemSeparatorComponent={Divider}
          data={PickupStops}
          renderItem={renderItem}
        />
      </View>
      {callStudentModal && (
        <ModalCallContacts
          contacts={contactsData.contacts}
          open={callStudentModal}
          handleClose={() => setCallStudentModal(false)}
          studentName={contactsData.student}
        />
      )}
    </SafeAreaView>
  )
}

export default Routes
