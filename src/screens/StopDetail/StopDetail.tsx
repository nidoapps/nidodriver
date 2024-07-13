import { RouteProp, useNavigation } from '@react-navigation/native'
import { Divider, List, Button, Icon } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import MapTest from '@/components/MapTest/MapTest'
import { ModalCallContacts } from '@/components/ModalCallContacts'
import { ModalCheckinEstudent } from '@/components/ModalCheckinEstudent'
import { StudentStopStatus } from '@/constants/common'
import { useDriversContext } from '@/hooks/useDriversContext'
import { StopStatus } from '@/models/common'
import { RootStackParams } from '@/navigation/NavigationParams'
import { setActiveTripStopDataAction } from '@/store/actions/trip'
import { setActiveTripStopData } from '@/store/reducers/trip'
import { colors } from '@/themeColors'
import useIncrementalTimer from '@/utils/useIncrementalTimer'
const StyledIcon = styled(Icon)
interface StopDetailProps {
  route: RouteProp<RootStackParams, 'stopDetail'>
}
const StopDetail = ({ route }: StopDetailProps) => {
  const { stopId } = route.params || {}
  const {
    dispatch,
    state: { activeTripStopData },
    hooks: {
      handleChangePassengerStopStatus,
      getTripStopData,
      handleChangeStopStatus,
    },
  } = useDriversContext()
  const { navigate } = useNavigation()
  const { passengers, status, tripStopId } = activeTripStopData || {
    passengers: [],
    status: StopStatus.scheduled,
  }

  // activeTrip.stops.find((stop) => stop.tripStopId === stopId) || {
  //   passengers: [],
  //   status: StopStatus.scheduled,
  // }
  const holdTime = 1
  const [initiatedStop, setInitiatedStop] = useState(false)
  const [visible, setVisible] = useState(false)
  const [openModalContacts, setOpenModalContacts] = useState(false)
  const [localStatus, setLocalStatus] = useState(status)
  let elapsedTime = useIncrementalTimer(holdTime)
  const [contactsData, setContactsData] = useState<{
    student?: string
    studentId?: number
    contacts?: any[]
  }>({
    student: '',
    contacts: [],
  })
  const wsRef = useRef(null)
  useEffect(() => {
    getTripStopData(stopId)
  }, [stopId, contactsData.studentId])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/trip-stop/get-status')

    ws.onopen = () => {
      console.log('WebSocket connection opened')
      ws.send(
        JSON.stringify({
          event: 'subscribe',
          data: 'tripStop',
        })
      )
    }

    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data)
        wsRef.current = ws
        // console.log('Received message:', response)
        // if (response) {
        //   ws.send(
        //     JSON.stringify({
        //       event: 'get',
        //       data: tripStopId || stopId,
        //     })
        //   )
        // }
        if (response.data && response.event === 'get') {
          // console.log('Received data:', response.data)
          dispatch(setActiveTripStopDataAction(response.data))
        } else {
          console.log('Unknown event or missing data in response:', response)
        }
      } catch (error) {
        console.log('Error processing WebSocket message:', error)
      }
    }

    ws.onclose = () => {
      console.log('WebSocket connection closed')
    }

    ws.onerror = (error) => {
      console.error('WebSocket connection error:', error)
    }
    return () => {
      ws.close()
      elapsedTime = '00:00'
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (wsRef.current) {
        wsRef.current.send(
          JSON.stringify({
            event: 'get',
            channel: 'tripStop',
            data: tripStopId || stopId,
          })
        )
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, [tripStopId, stopId])

  const completedStop = useMemo(() => {
    return (
      passengers.filter((e) => e.status === StopStatus.completed).length ===
      passengers.length
    )
  }, [activeTripStopData])

  const handleCompleteStop = useCallback(() => {
    handleChangeStopStatus(stopId ?? tripStopId, StopStatus.completed)
    setLocalStatus(StopStatus.completed)
    setInitiatedStop(false)

    setTimeout(() => {
      navigate('main')
    }, 4000)
  }, [handleChangeStopStatus, tripStopId, stopId])

  const InitStop = () => (
    <TouchableOpacity
      disabled={!status}
      className="p-2 items-center justify-end h-3/4"
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
    [StopStatus.scheduled]: InitStop(),
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
    <View
      key={index}
      className="px-4 py-6 flex-row justify-between items-center">
      <Text className="text-base font-semibold">
        {item?.passenger?.name} {item?.passenger?.lastName}
      </Text>
      <View>{renderActions(item)}</View>
    </View>
  )

  const renderActions = (item: any) => {
    return (
      <View className="flex flex-row gap-x-4">
        <Button
          status="basic"
          accessoryRight={<Icon name="phone-call-outline" />}
          onPress={() => {
            setOpenModalContacts(true)
            setContactsData({
              student: item.passenger.name,
              contacts: [
                ...item.passenger?.family?.members,
                ...item.passenger?.family?.responsibles,
              ] as any,
            })
          }}
        />
        <Button
          disabled={
            item.status === StudentStopStatus.completed || !initiatedStop
          }
          status={`${item.status === StudentStopStatus.pickedUp ? 'success' : 'basic'}`}
          accessoryRight={<Icon name="checkmark" />}
          onPress={() => {
            if (item.status !== StudentStopStatus.pickedUp)
              setContactsData({
                ...contactsData,
                studentId: item.tripStopPassengerId,
              })
            setVisible(true)
          }}
        />
      </View>
    )
  }
  return (
    <SafeAreaView className="bg-white h-screen">
      <View>
        <View className="flex h-1/4 justify-between bg-neutral-100">
          <View className="  items-center justify-center h-3/4 ">
            {!initiatedStop ? (
              <>{StopActionsByStatus[status || localStatus]}</>
            ) : (
              <TouchableOpacity
                className="p-2 items-center justify-center "
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
              </TouchableOpacity>
            )}
            {TimerComponent()}
          </View>
          {initiatedStop && (
            <View
              className={`w-full py-6 items-center ${
                initiatedStop && elapsedTime <= `${holdTime}:00`
                  ? 'bg-neutral-400'
                  : 'bg-midblue-500'
              }`}>
              <TouchableOpacity onPress={() => handleCompleteStop()}>
                <Text
                  className={`text-xl font-semibold text-white ${initiatedStop && elapsedTime <= `${holdTime}:00` ? 'text-neutral-200' : 'text-white'}`}>
                  Completar Parada
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View className="h-3/4 bg-white">
          <List
            data={passengers}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
            keyExtractor={(i) => Math.random().toString()}
          />
        </View>
        <MapTest />
      </View>
      {visible && (
        <ModalCheckinEstudent
          open={visible}
          handleClose={() => setVisible(false)}
          studentName={contactsData.student as string}
          handleCheckin={() => {
            // setLocalStatus(StudentStopStatus.pickedUp)
            handleChangePassengerStopStatus(
              contactsData.studentId,
              StudentStopStatus.pickedUp,
              tripStopId
            )
            setVisible(false)
          }}
        />
      )}
      {openModalContacts && (
        <ModalCallContacts
          contacts={contactsData.contacts as any[]}
          open={openModalContacts}
          handleClose={() => setOpenModalContacts(false)}
          studentName={contactsData.student}
        />
      )}
    </SafeAreaView>
  )
}

export default StopDetail
