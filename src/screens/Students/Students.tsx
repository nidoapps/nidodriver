import { useFocusEffect } from '@react-navigation/native'
import { Divider, Icon, List, Button, Input } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useDriversContext } from '@/hooks/useDriversContext'
import { t } from '@/locales/i18n'
import { PickupStops } from '@/mocks/stops'
import { colors } from '@/themeColors'
import { getInitials } from '@/utils/common'

const StyledIcon = styled(Icon)

const StudentsList = [
  ...PickupStops[0].students,
  ...PickupStops[1].students,
  ...PickupStops[2].students,
]

const Students = () => {
  const {
    hooks: { getPassengersInfo },
    state: { driverData, passengersInfo },
  } = useDriversContext()
  const [expanded, setExpanded] = useState(false)
  const [studentsData, setStudentsData] = useState(passengersInfo)
  const currentIndex = useRef(null)

  useFocusEffect(
    useCallback(() => {
      getPassengersInfo(driverData?.driverId)
    }, [driverData])
  )
  const StutendActions = ({ item }) => (
    <View className=" py-2 pb-4  justify-center bg-neutral-50">
      <Text className="text-base pl-6 mb-2 font-medium">Contactos:</Text>
      <List
        data={item?.family?.members}
        renderItem={({ item }) => (
          <View className="flex-row justify-between px-6 gap-y-2 py-3 bg-neutral-50 items-center">
            <Text className="text-base">
              {item?.name} {item?.lastName}
            </Text>
            <Button
              size="medium"
              status="basic"
              accessoryLeft={<StyledIcon name="phone-call" />}
            />
          </View>
        )}
      />
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
            <StudentIcon
              name={String(`${item?.name} ${item?.lastName}` || '')}
            />
            <View className="flex">
              <Text className="text-lg font-semibold">
                {item?.name} {item?.lastName}
              </Text>
              <Text className="text-base font-light leading-4">
                {item.family?.familyStop?.map((stop) => !!stop.name)}
              </Text>
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
        </View>
      </TouchableOpacity>
      {expanded && currentIndex.current === index && (
        <StutendActions item={item} />
      )}
    </>
  )

  const StudentIcon = ({ name }) => (
    <View className=" rounded-full bg-midblue-500 w-10 h-10 mr-3 items-center justify-center">
      <Text className="text-lg text-white font-medium">
        {getInitials(name)}
      </Text>
    </View>
  )

  const handleSearchStudent = useCallback(
    (value) => {
      if (value) {
        const filteredData = passengersInfo?.filter(
          (student) =>
            student.name
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase()) ||
            student.lastName
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase()) ||
            `${student.name} ${student.lastName}`
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase())
        )
        setStudentsData(filteredData)
      } else {
        setStudentsData(passengersInfo)
      }
    },
    [passengersInfo]
  )

  return (
    <SafeAreaView className="flex-1 grow  bg-white">
      <Text className="my-4 mx-6 text-xl font-semibold">
        {t('common.students')}
      </Text>
      <View className="my-2 px-4">
        <Input
          accessoryLeft={
            <StyledIcon
              name="search-outline"
              fill={colors.darkGrey2}
              className="w-1 h-1 "
            />
          }
          placeholder="Buscar estudiante"
          onChangeText={handleSearchStudent}
        />
      </View>
      <List
        data={studentsData || passengersInfo || []}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default Students
