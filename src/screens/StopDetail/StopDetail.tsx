import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { Divider, List, Button, Icon, Spinner } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView, View, Text, Animated, Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { ModalCallContacts } from '@/components/ModalCallContacts'
import { ModalCancelEstudent } from '@/components/ModalCancelEstudent'
import { ModalCheckinEstudent } from '@/components/ModalCheckinEstudent'
import { StudentStopStatus } from '@/constants/common'
import { useDriversContext } from '@/hooks/useDriversContext'
import { StopStatus } from '@/models/common'
import { RootStackParams } from '@/navigation/NavigationParams'
import { setActiveTripStopDataAction } from '@/store/actions/trip'
import { colors } from '@/themeColors'
import createTimer from '@/utils/createTimer'
import { formatDateWithTime } from '@/utils/formatDate'
import getIncrementalTimer from '@/utils/useIncrementalTimer'
const StyledIcon = styled(Icon)
const StyledButton = styled(Button)

const av = new Animated.Value(0)
av.addListener(() => {})
interface StopDetailProps {
  route: RouteProp<RootStackParams, 'stopDetail'>
}

const ActionStatus = {
  [StudentStopStatus.scheduled]: 'basic',
  [StudentStopStatus.pickedUp]: 'success',
  [StudentStopStatus.arrived]: 'success',
  [StudentStopStatus.cancelled]: 'danger',
  '': 'basic',
}

const ActionStatusClasses = {
  [StudentStopStatus.scheduled]: 'bg-neutral-100',
  [StudentStopStatus.pickedUp]: 'bg-success',
  [StudentStopStatus.arrived]: 'bg-success',
  [StudentStopStatus.cancelled]: 'bg-error-100',
  '': 'bg-neutral-100',
}

const CancellActionStatusClasses = {
  [StudentStopStatus.scheduled]: 'bg-neutral-50',
  [StudentStopStatus.pickedUp]: 'bg-neutral-50',
  [StudentStopStatus.arrived]: 'bg-neutral-50',
  [StudentStopStatus.cancelled]: 'bg-error-100',
  '': 'bg-neutral-50',
}

const StatusClasses = {
  [StudentStopStatus.scheduled]: 'text-neutral-800',
  [StudentStopStatus.pickedUp]: 'text-success',
  [StudentStopStatus.arrived]: 'text-success',
  [StudentStopStatus.cancelled]: 'text-error',
  '': 'text-neutral-800',
}

const CopyByTripStatus: { [key: string]: string } = {
  [StudentStopStatus.pickedUp]: 'Recogido',
  [StudentStopStatus.arrived]: 'En destino',
  [StudentStopStatus.scheduled]: 'Programado',
  [StudentStopStatus.cancelled]: 'Cancelado',
  [StudentStopStatus.noShow]: 'Ausente',
}

const wsUrl = 'ws://localhost:8000/trip-stop/get-status'
;('wss://nidoapp-a3672380868e.herokuapp.com:443/trip-stop/get-status')

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
  const { passengers, status, tripStopId } = activeTripStopData || {
    passengers: [],
  }
  const holdTime = 1

  const [localStatus, setLocalStatus] = useState(status)
  const [initiatedStop, setInitiatedStop] = useState(
    status === StopStatus.inProgress
  )
  const [visible, setVisible] = useState(false)
  const [showCancelStudent, setShowCancelStudent] = useState(false)
  const [openModalContacts, setOpenModalContacts] = useState(false)
  const [contactsData, setContactsData] = useState<{
    student?: string
    studentId?: number
    contacts?: any[]
    status?: StudentStopStatus
  }>({
    student: '',
    contacts: [],
  })
  const wsRef = useRef(null)
  useFocusEffect(
    useCallback(() => {
      dispatch(setActiveTripStopDataAction(null))

      getTripStopData(stopId)
    }, [stopId, localStatus, initiatedStop])
  )
  console.log(activeTripStopData)
  useEffect(() => {
    const ws = new WebSocket(wsUrl)

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
        if (response.data && response?.data?.passengers) {
          dispatch(setActiveTripStopDataAction(response.data))
        } else {
          // console.log('data in response:', response)
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
    }, 6000)

    return () => clearInterval(intervalId)
  }, [tripStopId, stopId])

  useEffect(() => {
    return () => {
      setInitiatedStop(false)
    }
  }, [])

  const handleCheckin = useCallback(
    async (status) => {
      await handleChangePassengerStopStatus(
        contactsData.studentId,
        status,
        tripStopId
      )
      await getTripStopData(stopId)
      setVisible(false)
      setShowCancelStudent(false)
    },
    [
      contactsData.studentId,
      handleChangePassengerStopStatus,
      tripStopId,
      stopId,
    ]
  )

  const handleInitiateStop = useCallback(async () => {
    await handleChangeStopStatus(stopId || tripStopId, StopStatus.inProgress)
    setLocalStatus(StopStatus.inProgress)
    setInitiatedStop(true)
  }, [stopId, tripStopId])

  const handleCompleteStop = useCallback(() => {
    handleChangeStopStatus(stopId ?? tripStopId, StopStatus.completed)
    setLocalStatus(StopStatus.completed)
    setInitiatedStop(false)
  }, [handleChangeStopStatus, tripStopId, stopId])

  const InitStop = () => (
    <TouchableOpacity
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
  const InProgressStop = () => {
    const [elapsedTime, setElapsedTime] = useState('0:00')
    useEffect(() => {
      let elapsedSeconds = 0

      const interval = setInterval(() => {
        elapsedSeconds++

        const minutes = Math.floor(elapsedSeconds / 60)
        const seconds = elapsedSeconds % 60

        const formatedTipe = `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`
        setElapsedTime(formatedTipe)
      }, 1000)

      return () => clearInterval(interval)
    }, [])
    const completedAllStudents = useMemo(
      () =>
        passengers.filter(
          ({ status }) => status !== StudentStopStatus.scheduled
        ).length === passengers.length,
      [passengers]
    )
    return (
      <View className="w-full h-full items-center justify-between">
        <TouchableOpacity
          className=" items-center  pt-4 justify-center "
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
            className="h-20 w-20"
          />
        </TouchableOpacity>

        <View
          className={`mx-auto shadow rounded-xl bg-white justify-center h-16 w-32 items-center  px-4 ${elapsedTime >= `${holdTime}:00` && '!text-red-600'}`}>
          <Text
            className={`font-bold text-emerald-600 text-3xl ${elapsedTime >= `${holdTime}:00` && 'text-error'} `}>
            {elapsedTime}
          </Text>
        </View>

        <View className="w-full">
          <StyledButton
            className="h-20"
            onPress={() => handleCompleteStop()}
            disabled={!completedAllStudents && elapsedTime <= `${holdTime}:00`}
            size="giant">
            Completar Parada
          </StyledButton>
        </View>
      </View>
    )
  }

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

  const renderItem = ({ item, index }: any): React.ReactElement => (
    <View
      key={index}
      className="px-2 py-6 flex-row justify-between items-center">
      <View className=" w-28">
        <Text className="text-base">
          {item?.passenger?.name} {item?.passenger?.lastName}
        </Text>
        <Text className={StatusClasses[item.status]}>
          {CopyByTripStatus[item?.status]}
        </Text>
      </View>
      <View>{renderActions(item)}</View>
    </View>
  )

  const renderActions = useCallback(
    (item: any) => {
      return (
        <View className="flex flex-row gap-x-3">
          <Button
            status="basic"
            accessoryRight={<Icon name="phone-call-outline" />}
            onPress={() => {
              setOpenModalContacts(true)
              setContactsData({
                student: `${item.passenger.name} ${item.passenger.lastName}`,
                contacts:
                  ([
                    ...item.passenger?.family?.members,
                    ...item.passenger?.family?.responsibles,
                  ] as any) || [],
              })
            }}
          />
          <StyledButton
            disabled={status === StopStatus.completed ?? !initiatedStop}
            className={
              status === StopStatus.completed || !initiatedStop
                ? ` opacity-80 ${CancellActionStatusClasses[item.status]}  `
                : 'bg-neutral-50 !border-neutral-100'
            }
            status={
              item.status === StudentStopStatus.cancelled ? 'danger' : 'basic'
            }
            appearance="outline"
            size="tiny"
            onPress={() => {
              setShowCancelStudent(true)

              setContactsData({
                ...contactsData,
                studentId: item.tripStopPassengerId,
                student: `${item.passenger.name} ${item.passenger.lastName}`,
                status: item.status,
              })
            }}>
            <StyledIcon
              name="close"
              className="w-5 h-5"
              fill={
                item.status === StudentStopStatus.cancelled
                  ? colors.white
                  : colors.light.darkGrey
              }
            />
          </StyledButton>
          <StyledButton
            disabled={
              status === StopStatus.scheduled || status === StopStatus.completed
            }
            className={
              item.status === StudentStopStatus.pickedUp ||
              item.status === StudentStopStatus.arrived
                ? 'bg-success'
                : 'bg-white border-success'
            }
            status={
              item.status === StudentStopStatus.pickedUp ||
              item.status === StudentStopStatus.arrived
                ? 'success'
                : 'basic'
            }
            onPress={() => {
              setVisible(true)

              setContactsData({
                ...contactsData,
                studentId: item.tripStopPassengerId,
                student: `${item.passenger.name} ${item.passenger.lastName}`,
                status: item.status,
              })
            }}>
            <StyledIcon
              className="w-6 h-6"
              name="checkmark"
              fill={
                item.status === StudentStopStatus.arrived ||
                item.status === StudentStopStatus.pickedUp
                  ? colors.white
                  : colors.light.lightBlue
              }
            />
          </StyledButton>
        </View>
      )
    },
    [status, initiatedStop]
  )

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
              {StopActionsByStatus[(status as StopStatus) || localStatus]}
            </View>
            <View className="h-2/3 bg-white">
              {!passengers && !activeTripStopData ? (
                <View className="flex h-full justify-center items-center ">
                  <Spinner status="primary" />
                </View>
              ) : (
                <List
                  data={passengers}
                  ItemSeparatorComponent={Divider}
                  renderItem={renderItem}
                  keyExtractor={(i) => Math.random().toString()}
                />
              )}
            </View>
          </View>
        )}
      </>
      {visible && (
        <ModalCheckinEstudent
          open={visible}
          handleClose={() => setVisible(false)}
          studentName={contactsData.student as string}
          status={contactsData.status || StudentStopStatus.scheduled}
          handleCheckin={() =>
            handleCheckin(
              contactsData.status === StudentStopStatus.cancelled
                ? StudentStopStatus.pickedUp
                : null
            )
          }
        />
      )}
      {showCancelStudent && (
        <ModalCancelEstudent
          open={showCancelStudent}
          handleClose={() => setShowCancelStudent(false)}
          studentName={contactsData.student as string}
          status={contactsData.status || StudentStopStatus.scheduled}
          handleCheckin={() => handleCheckin(StudentStopStatus.cancelled)}
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
