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

import MapTest from '@/components/MapTest/MapTest'
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
  const { students, holdTime, status } = PickupStops.find(
    (stop) => stop.id === stopId
  ) || { holdTime: 3 }
  const [initiatedStop, setInitiatedStop] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [openModalContacts, setOpenModalContacts] = React.useState(false)
  const [contactsData, setContactsData] = useState({
    student: '',
    contacts: [],
  })

  const [localStatus, setLocalStatus] = React.useState(status)

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
        <Text className="text-base">
          Parada iniciada el 15/05/2024 a las 7:32am
        </Text>
        <Text className="text-base">
          Parada completada el 15/05/2024 a las 7:35am
        </Text>
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
            className={`mx-auto shadow rounded-xl bg-white justify-center h-16 w-32 items-center  px-4 my-2 ${elapsedTime >= `${holdTime}:00` && '!text-red-600'}`}>
            <Text
              className={`font-bold text-emerald-600 text-3xl ${elapsedTime >= `${holdTime}:00` && 'text-error'} `}>
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
            setOpenModalContacts(true)
            setContactsData({
              student: student.name,
              contacts: student.contacts,
            })
          }}
        />
        <Button
          status={`${localStatus === StudentStopStatus.completed ? 'success' : 'basic'}`}
          accessoryRight={<Icon name="checkmark" />}
          onPress={() => {
            if (student.stopStatus !== StudentStopStatus.completed)
              setVisible(true)
          }}
        />
      </View>
    )
  }
  return (
    <SafeAreaView className="bg-white h-screen">
      <View>
        <View className="h-1/4 bg-neutral-100 items-center justify-center ">
          {!initiatedStop ? (
            <>{StopActionsByStatus[localStatus]}</>
          ) : (
            <TouchableOpacity
              className="p-2 items-center justify-center"
              onPress={() => {
                setLocalStatus(StopStatus.completed)
                setInitiatedStop(false)
              }}>
              <StyledIcon
                name={
                  initiatedStop && elapsedTime <= `${holdTime}:00`
                    ? 'checkmark-circle'
                    : 'checkmark-circle'
                }
                fill={
                  initiatedStop && elapsedTime <= `${holdTime}:00`
                    ? colors.darkGrey2
                    : colors.primary
                }
                className="h-20 w-20 mb-2"
              />
              <View
                className={`p-3  rounded ${
                  initiatedStop && elapsedTime <= `${holdTime}:00`
                    ? 'bg-neutral-400'
                    : 'bg-midblue-500'
                }`}>
                <Text
                  className={`text-lg font-semibold text-white ${initiatedStop && elapsedTime <= `${holdTime}:00` ? 'text-neutral-200' : 'text-white'}`}>
                  Completar Parada
                </Text>
              </View>
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
        <MapTest />
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
