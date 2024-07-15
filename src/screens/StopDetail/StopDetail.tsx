import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { Divider, List, Button, Icon, Spinner } from '@ui-kitten/components'
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
import { formatDateWithTime } from '@/utils/formatDate'
import useIncrementalTimer from '@/utils/useIncrementalTimer'
const StyledIcon = styled(Icon)
const StyledButton = styled(Button)
interface StopDetailProps {
  route: RouteProp<RootStackParams, 'stopDetail'>
}
const StopDetail = ({ route }: StopDetailProps) => {
  const { stopId } = route.params || {}
  const {
    dispatch,
    state: { activeTripStopData, loadingActiveStopData },
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
  const holdTime = 1
  const [localStatus, setLocalStatus] = useState(status)
  const [initiatedStop, setInitiatedStop] = useState(
    false || status === StopStatus.inProgress
  )
  const [visible, setVisible] = useState(false)
  const [openModalContacts, setOpenModalContacts] = useState(false)
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

  useFocusEffect(
    useCallback(() => {
      getTripStopData(stopId)
    }, [stopId, route, localStatus])
  )

  // useEffect(() => {
  //   getTripStopData(stopId)
  // }, [stopId, contactsData.studentId])

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
        console.log('Received message:', response)
        // if (response) {
        //   ws.send(
        //     JSON.stringify({
        //       event: 'get',
        //       data: tripStopId || stopId,
        //     })
        //   )
        // }
        if (response.data) {
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

  // const completedStop = useMemo(() => {
  //   return (
  //     passengers.filter((e) => e.status === StopStatus.completed).length ===
  //     passengers.length
  //   )
  // }, [activeTripStopData])

  const handleInitiateStop = useCallback(() => {
    handleChangeStopStatus(stopId ?? tripStopId, StopStatus.inProgress)
    setLocalStatus(StopStatus.inProgress)
    setInitiatedStop(true)
  }, [])

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
      onPress={() => handleInitiateStop()}>
      <StyledIcon
        name="play-circle"
        fill={colors.primary}
        className="h-20 w-20"
      />
      <Text className="text-lg font-semibold">Iniciar Parada</Text>
    </TouchableOpacity>
  )

  const InProgressStop = () => (
    <View className="w-full h-full items-center justify-between">
      <TouchableOpacity
        className=" items-center  pt-6 justify-center "
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

      <View
        className={`mx-auto shadow rounded-xl bg-white justify-center h-16 w-32 items-center  px-4 my-2 ${elapsedTime >= `${holdTime}:00` && '!text-red-600'}`}>
        <Text
          className={`font-bold text-emerald-600 text-3xl ${elapsedTime >= `${holdTime}:00` && 'text-error'} `}>
          {elapsedTime}
        </Text>
      </View>

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
    </View>
  )

  const CancelledStop = () => (
    <View className=" items-center justify-center h-full">
      <StyledIcon
        name="close-circle"
        fill={colors.error}
        className="h-20 w-20 mb-8"
      />
      <Text className="text-xl font-semibold">Parada cancelada</Text>
      <Text className="text-base">
        Parada cancelada el {formatDateWithTime(activeTripStopData?.canceledAt)}
      </Text>
    </View>
  )

  const CompletedStop = () => (
    <View className=" items-center justify-center h-full">
      <StyledIcon
        name="checkmark-circle-2"
        fill={colors.success}
        className="h-20 w-20 mb-8"
      />
      <Text className="text-xl font-semibold">Parada completada</Text>
      <Text className="text-base">
        Parada iniciada el {formatDateWithTime(activeTripStopData?.startedAt)}
      </Text>
      <Text className="text-base">
        Parada completada el{' '}
        {formatDateWithTime(activeTripStopData?.completedAt)}
      </Text>
    </View>
  )

  const StopActionsByStatus: { [key in StopStatus]: React.ReactElement } = {
    [StopStatus.completed]: CompletedStop(),
    [StopStatus.inProgress]: InProgressStop(),
    [StopStatus.scheduled]: InitStop(),
    [StopStatus.cancelled]: CancelledStop(),
    [StopStatus.skipped]: CancelledStop(),
  }

  // const TimerComponent = useCallback(() => {
  //   return (
  //     <>
  //       {initiatedStop ? (
  //         <View
  //           className={`mx-auto shadow rounded-xl bg-white justify-center h-16 w-32 items-center  px-4 my-2 ${elapsedTime >= `${holdTime}:00` && '!text-red-600'}`}>
  //           <Text
  //             className={`font-bold text-emerald-600 text-3xl ${elapsedTime >= `${holdTime}:00` && 'text-error'} `}>
  //             {elapsedTime}
  //           </Text>
  //         </View>
  //       ) : null}
  //     </>
  //   )
  // }, [initiatedStop, elapsedTime])

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
              contacts:
                ([
                  ...item.passenger?.family?.members,
                  ...item.passenger?.family?.responsibles,
                ] as any) || [],
            })
          }}
        />
        <StyledButton
          disabled={
            item.status !== StudentStopStatus.scheduled ||
            status !== StopStatus.inProgress
          }
          className={`${
            (item.status === StudentStopStatus.pickedUp ||
              status === StopStatus.completed) &&
            '!bg-success '
          } `}
          status={`${item.status === StudentStopStatus.pickedUp ? 'success' : 'basic'}`}
          accessoryRight={
            <StyledIcon
              name="checkmark"
              fill={
                (item.status === StudentStopStatus.pickedUp ||
                  status === StopStatus.completed) &&
                colors.white
              }
            />
          }
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
      <>
        {loadingActiveStopData ? (
          <View className="flex-1 justify-center items-center ">
            <Spinner status="primary" />
          </View>
        ) : (
          <View>
            <View className="flex h-1/3  bg-neutral-100">
              {StopActionsByStatus[status as StopStatus]}
            </View>
            <View className="h-2/3 bg-white">
              <List
                data={passengers || []}
                ItemSeparatorComponent={Divider}
                renderItem={
                  passengers
                    ? renderItem
                    : () => (
                        <>
                          <Spinner status="primary" />
                        </>
                      )
                }
                keyExtractor={(i) => Math.random().toString()}
              />
            </View>
          </View>
        )}
      </>
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
