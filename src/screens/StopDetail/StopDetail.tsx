import { RouteProp, useNavigation } from '@react-navigation/native'
import {
  Divider,
  List,
  ListItem,
  Button,
  Icon,
  Layout,
} from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, View, Text, Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { ModalCallContacts } from '@/components/ModalCallContacts'
import { ModalCheckinEstudent } from '@/components/ModalCheckinEstudent'
import { StudentStopStatus } from '@/constants/common'
import { PickupStops } from '@/mocks/stops'
import { StopStatus } from '@/models/common'
import { RootStackParams } from '@/navigation/NavigationParams'
import { colors } from '@/themeColors'
import useIncrementalTimer from '@/utils/useIncrementalTimer'

const StyledIcon = styled(Icon)
interface StopDetailProps {
  route: RouteProp<RootStackParams, 'stopDetail'>
}
const StopDetail = ({ route }: StopDetailProps) => {
  const { stopId } = route.params || {}
  const [initiatedStop, setInitiatedStop] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [openModalContacts, setOpenModalContacts] = React.useState(false)
  const [contactsData, setContactsData] = useState({
    student: '',
    contacts: [],
  })

  let { students, holdTime, status } = PickupStops.find(
    (stop) => stop.id === stopId
  ) || { holdTime: 3 }

  // const remainingTime = React.useMemo(() => {
  //   return useTimer(holdTime)
  // }, [holdTime])
  const elapsedTime = useIncrementalTimer(holdTime)

  const InitStop = () => (
    <TouchableOpacity
      disabled={!status}
      className="p-2 items-center justify-center"
      onPress={() => setInitiatedStop(true)}>
      <StyledIcon
        name="play-circle"
        fill={colors.primary}
        className="h-20 w-20"
      />
      <Text className="text-lg font-semibold">Iniciar Parada</Text>
    </TouchableOpacity>
  )

  const StopActionsByStatus = {
    [StopStatus.completed]: (
      <TouchableOpacity className="p-2 items-center justify-center" disabled>
        <StyledIcon
          name="checkmark-circle-2"
          fill={colors.success}
          className="h-20 w-20"
        />
        <Text className="text-lg font-semibold">Parada completada</Text>
      </TouchableOpacity>
    ),
    [StopStatus.active]: InitStop(),
    [StopStatus.pending]: InitStop(),
  }

  const TimerComponent = useCallback(() => {
    return (
      <>
        {initiatedStop ? (
          <View
            className={`mx-auto shadow rounded-xl bg-white justify-center h-16 w-32 items-center  px-4 my-2 ${elapsedTime === `${holdTime}:00` && '!text-red-600'}`}>
            <Text
              className={`font-bold text-emerald-600 text-3xl ${elapsedTime === `${holdTime}:00` && 'text-error'} `}>
              {elapsedTime}
            </Text>
          </View>
        ) : null}
      </>
    )
  }, [initiatedStop, elapsedTime])

  const renderItem = ({ item, index }: any): React.ReactElement => (
    <View className="px-4 py-6 flex-row justify-between items-center">
      <Text className="text-base font-semibold">{item.name}</Text>
      <View>{renderActions(item)}</View>
    </View>
  )

  const renderActions = (student: any) => {
    return (
      <View className="flex flex-row gap-x-4">
        <Button
          status="basic"
          accessoryRight={<Icon name="phone-call-outline" />}
          onPress={() => {
            // Linking.openURL(`tel://${phone}`)
            setOpenModalContacts(true)
            setContactsData({
              student: student.name,
              contacts: student.contacts,
            })
          }}
        />
        <Button
          status={`${student.stopStatus === StudentStopStatus.completed ? 'success' : 'basic'}`}
          accessoryRight={<Icon name="checkmark" />}
          onPress={() => setVisible(true)}
        />
      </View>
    )
  }
  return (
    <SafeAreaView className="bg-white h-screen">
      <View>
        <View className="h-1/4 bg-neutral-100 items-center justify-center ">
          {!initiatedStop ? (
            <>{StopActionsByStatus[status]}</>
          ) : (
            <TouchableOpacity
              className="p-2 items-center justify-center"
              onPress={() => {
                status = StopStatus.completed
                setInitiatedStop(false)
              }}>
              <StyledIcon
                name={
                  initiatedStop && elapsedTime <= '5:00'
                    ? 'checkmark-circle'
                    : 'checkmark-circle-2'
                }
                fill={
                  initiatedStop && elapsedTime <= '5:00'
                    ? colors.darkGrey2
                    : colors.success
                }
                className="h-20 w-20"
              />
              <Text className="text-lg font-semibold">Completar Parada</Text>
            </TouchableOpacity>
          )}
          {TimerComponent()}
        </View>
        <View className="h-3/4 bg-white">
          <List
            data={students}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
        </View>
      </View>
      {visible && (
        <ModalCheckinEstudent
          open={visible}
          handleClose={() => setVisible(false)}
          studentName="Juan Perez"
        />
      )}
      {openModalContacts && (
        <ModalCallContacts
          contacts={contactsData.contacts}
          open={openModalContacts}
          handleClose={() => setOpenModalContacts(false)}
          studentName={contactsData.student}
        />
      )}
    </SafeAreaView>
  )
}

export default StopDetail
