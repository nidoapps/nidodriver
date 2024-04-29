import {
  Divider,
  Drawer,
  DrawerGroup,
  DrawerItem,
  Icon,
  List,
  Popover,
  Tab,
  TabBar,
  Button,
} from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { PickupStops } from '@/mocks/PickupStops'
import { colors } from '@/themeColors'

const StyledTabBar = styled(TabBar)
const StyledIcon = styled(Icon)

const Students = () => {
  const students = PickupStops[0].students
  const [selectedTab, setSelectedTab] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const currentIndex = useRef(null)

  const TopTabBar = useCallback(
    () => (
      <StyledTabBar
        className="py-4"
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}>
        <Tab title="Costa del Este Ida" />
        <Tab title="Costa del Este Vuelta" />
      </StyledTabBar>
    ),
    [selectedTab]
  )

  const StutendActions = ({ item }) => (
    <View className=" px-6 py-2 pb-4  justify-center bg-neutral-50">
      <Text className="text-base font-medium">Contactos:</Text>
      <View className="flex-row justify-between my-2 items-center">
        <Text className="text-base">{item.name}</Text>
        <Button
          size="medium"
          status="basic"
          accessoryLeft={<StyledIcon name="phone-call" />}
        />
      </View>
    </View>
  )

  const renderItem = ({ item, index }: any): React.ReactElement => (
    <>
      <TouchableOpacity
        onPress={() => {
          setExpanded((prev) => !prev)
          currentIndex.current = index
        }}>
        <View className="flex-row px-4 py-6 items-center justify-between">
          <View className="flex-row items-center">
            <StudentIcon />
            <Text className="text-lg font-semibold">{item.name}</Text>
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
        </View>
      </TouchableOpacity>
      {expanded && currentIndex.current === index && (
        <StutendActions item={item} />
      )}
    </>
  )

  const StudentIcon = (props: any) => (
    <View className=" rounded-full bg-midblue-500 py-1 px-2 mr-3">
      <Text className="text-lg text-white font-medium">JP</Text>
    </View>
  )

  return (
    <SafeAreaView className="bg-white h-screen">
      <TopTabBar />
      {!selectedTab ? (
        <List
          data={PickupStops[0].students}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      ) : (
        <List
          data={PickupStops[1].students}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  )
}

export default Students
