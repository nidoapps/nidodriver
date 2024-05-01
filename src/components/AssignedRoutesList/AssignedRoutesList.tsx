import { useNavigation } from '@react-navigation/native'
import { Divider, Icon, List } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useDriversContext } from '@/hooks/useDriversContext'
import { colors } from '@/themeColors'

const StyledIcon = styled(Icon)

const AssignedRoutesList = () => {
  const {
    state: { assignedTrips },
    dispatch,
  } = useDriversContext()

  const [expanded, setExpanded] = useState(false)
  const currentIndex = useRef(null)
  const { navigate } = useNavigation()

  const RouteDetailList = ({ item }) => (
    <View className="px-3 py-2 bg-neutral-50">
      {item.stops.map((stop, i) => (
        <TouchableOpacity
          onPress={() =>
            navigate('stopDetail', { stopId: stop.id, stopTitle: stop.title })
          }
          key={i}
          className="flex-row items-center justify-between gap-x-2 my-1">
          <View className="flex-row items-center">
            <StyledIcon
              name="pin"
              fill={colors.darkGrey2}
              className="w-6 h-6"
            />
            <View className="ml-2">
              <Text className=" text-lg">{stop.title}</Text>
              <Text>{stop.address}</Text>
            </View>
          </View>
          <StyledIcon
            name="chevron-right"
            fill={colors.primary}
            className="w-10 h-10"
          />
        </TouchableOpacity>
      ))}
    </View>
  )

  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setExpanded((prev) => !prev)
            currentIndex.current = index
          }}
          className="bg-white flex-row px-4 py-5 my-1 border border-neutral-200 justify-between items-center">
          <View className="flex  gap-y-1">
            <Text className="text-2xl font-medium">{item.title}</Text>
            <Text>Origen: {item.stops[0].title}</Text>
            <Text>Destino: {item.stops[item.stops.length - 1].title}</Text>
            <Text>Paradas: {item.stops.length}</Text>
          </View>
          <StyledIcon
            name={
              expanded && currentIndex.current === index
                ? 'arrow-ios-upward'
                : 'arrow-ios-downward'
            }
            className="w-8 h-8"
            fill={colors.darkGrey}
          />
        </TouchableOpacity>
        {expanded && currentIndex.current === index && (
          <RouteDetailList item={item} />
        )}
      </>
    )
  }
  return (
    <>
      <List data={assignedTrips} renderItem={renderItem} />
    </>
  )
}

export default AssignedRoutesList
