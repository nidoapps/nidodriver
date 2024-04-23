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
import React from 'react'
import { SafeAreaView, View, Text, Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { ModalCheckinEstudent } from '@/components/ModalCheckinEstudent'
import { StudentStopStatus } from '@/constants/common'
import { stops } from '@/mocks/stops'
import { StopStatus } from '@/models/common'
import { RootStackParams } from '@/navigation/NavigationParams'
import { colors } from '@/themeColors'
import { buildShadow } from '@/utils/boxShadow'
import useTimer from '@/utils/useTimer'

const StyledIcon = styled(Icon)
interface StopDetailProps {
  route: RouteProp<RootStackParams, 'stopDetail'>
}
const StopDetail = ({ route }: StopDetailProps) => {
  const { stopId } = route.params || {}
  const [initiatedStop, setInitiatedStop] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  let { students, holdTime, status } = stops.find(
    (stop) => stop.id === stopId
  ) || { holdTime: 3 }

  // const remainingTime = React.useMemo(() => {
  //   return useTimer(holdTime)
  // }, [holdTime])
  const remainingTime = useTimer(1)

  const InitStop = () => (
    <TouchableOpacity
      disabled={!status || status !== StopStatus.active}
      className={`p-2 items-center justify-center  ${status !== 'active' && 'opacity-50'}`}
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

  const TimerComponent = () => {
    return (
      <>
        {initiatedStop ? (
          <View className="mx-auto shadow rounded-xl bg-white justify-center h-14  px-6 my-2">
            <Text className="font-bold text-emerald-600 text-2xl ">
              {remainingTime}
            </Text>
          </View>
        ) : null}
      </>
    )
  }

  const renderItem = ({ item, index }: any): React.ReactElement => (
    <View className="px-4 py-6 flex-row justify-between items-center">
      <Text className="text-base font-semibold">{item.name}</Text>
      <View>
        {renderActions(item.id, item.phone, item.stopStatus, String(status))}
      </View>
    </View>
  )

  const renderActions = (
    id: string,
    phone: string,
    studentStatus: string,
    stopStatus: string
  ) => {
    return (
      <View className="flex flex-row gap-x-4">
        <Button
          status="basic"
          accessoryRight={<Icon name="phone-call-outline" />}
          onPress={() => {
            Linking.openURL(`tel://${phone}`)
          }}
        />
        <Button
          status={`${studentStatus === StudentStopStatus.completed ? 'success' : 'basic'}`}
          disabled={stopStatus === StopStatus.pending}
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
              disabled={initiatedStop && remainingTime !== '0:00'}
              onPress={() => {
                status = StopStatus.completed
                setInitiatedStop(false)
              }}>
              <StyledIcon
                name={
                  initiatedStop && remainingTime !== '0:00'
                    ? 'checkmark-circle'
                    : 'checkmark-circle-2'
                }
                fill={
                  initiatedStop && remainingTime !== '0:00'
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
    </SafeAreaView>
  )
}

export default StopDetail
