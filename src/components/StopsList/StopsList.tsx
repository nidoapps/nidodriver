import { useNavigation } from '@react-navigation/native'
import { Icon, List } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useMemo, useState } from 'react'
import { TouchableOpacity, View, Text, Animated } from 'react-native'
import { RectButton, Swipeable } from 'react-native-gesture-handler'

import {
  StudentStopStatus,
  TripDirectionText,
  TripStatus,
} from '@/constants/common'
import { useDriversContext } from '@/hooks/useDriversContext'
import { t } from '@/locales/i18n'
import { PickupStops } from '@/mocks/stops'
import { StopStatus } from '@/models/common'
import { colors } from '@/themeColors'

const StyledIcon = styled(Icon)
const StyledRectButton = styled(RectButton)

const StopsList = () => {
  const { navigate } = useNavigation()
  const [data, setData] = useState(PickupStops)
  const {
    hooks: { handleChangeTripStatus },
    state: { activeTrip },
  } = useDriversContext()
  // const pulseIconRef = React.useRef<Icon<Partial<ImageProps>>>()

  // useEffect(() => {
  //   getActiveTrip()
  // }, [])

  const statusClasses: { [key: string]: string } = {
    [StopStatus.scheduled]: 'border-neutral-300 bg-neutral-50',
    [StopStatus.completed]: 'border-neutral-300 bg-neutral-50 opacity-80',
    [StopStatus.inProgress]: 'border-2 border-midblue-400 bg-primary-50',
  }

  const statusIcons: { [key: string]: string } = {
    [StopStatus.inProgress]: 'radio-button-on',
    [StopStatus.scheduled]: 'radio-button-off',
    [StopStatus.completed]: 'checkmark-circle-2',
  }

  const statusIconsColors: { [key: string]: string } = {
    [StopStatus.scheduled]: colors.grey,
    [StopStatus.cancelled]: colors.error,
    [StopStatus.completed]: colors.success,
    [StopStatus.inProgress]: colors.primary,
  }

  const calculateStatus = (item, index) => {
    if (
      (item.status === StopStatus.scheduled &&
        index > 0 &&
        activeTrip?.stops[index - 1].status === StopStatus.completed) ||
      (index === 0 && item.status === StopStatus.scheduled)
    ) {
      return StopStatus.inProgress
    } else if (item.status === StopStatus.scheduled) {
      return StopStatus.scheduled
    }
    return StopStatus.completed
  }

  const handleCompleteTrip = useCallback(async () => {
    await handleChangeTripStatus(activeTrip?.tripId || '', TripStatus.completed)
  }, [activeTrip])

  const renderLeftActions = (progress: any, dragX: any) => {
    return (
      <StyledRectButton
        className="bg-green-500 justify-center items-center flex h-20 w-full "
        // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <>
          <Animated.Text className="!text-white text-2xl font-semibold ">
            Completando Ruta
          </Animated.Text>
        </>
      </StyledRectButton>
    )
  }

  const showCompleteRoute =
    useMemo(() => {
      return (
        activeTrip?.stops?.filter(
          (stop) =>
            stop.status === StopStatus.completed ||
            stop.status === StopStatus.cancelled
        )?.length === activeTrip?.stops?.length || false
      )
    }, [activeTrip]) || false

  const renderItem = ({ item, index, ...rest }: any): React.ReactElement => {
    return (
      <>
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigate('stopDetail', {
              stopId: item.tripStopId,
              stopTitle: item?.routeStop.schoolStop?.address || '',
            })
          }
          className={`h-20  px-3 py-4 mx-2 border-2 flex-row items-center justify-between rounded-lg my-1 ${statusClasses[calculateStatus(item, index)]}`}>
          <View className=" flex-row items-center justify-center mr-2 gap-x-2">
            <Text className="font-semibold text-lg text-neutral-800">
              {index + 1}
            </Text>
            <View className="">
              <Text className="text-lg font-semibold text-neutral-800">
                {item?.routeStop?.schoolStop?.address ?? ''}
              </Text>
              <View className="flex ">
                <View className="items-center flex-row">
                  <StyledIcon
                    fill={colors.light.darkGrey2}
                    className="h-4 w-4 !fill-neutral-300 mr-1"
                    name="people"
                  />
                  <Text className="text-sm !text-neutral-700">
                    {t('common.students')}:{' '}
                    {
                      item?.passengers?.filter(
                        ({ status }) =>
                          status === StudentStopStatus.pickedUp ||
                          status === StudentStopStatus.arrived
                      ).length
                    }{' '}
                    / {item?.passengers?.length}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="h-20 items-center justify-center mr-2">
            <StyledIcon
              fill={statusIconsColors[calculateStatus(item, index)]}
              name={
                statusIcons[calculateStatus(item, index)] ||
                'checkmark-circle-2'
              }
              className="h-6 w-6"
            />
          </View>
        </TouchableOpacity>
      </>
    )
  }
  return (
    <>
      {activeTrip && activeTrip.stops ? (
        <>
          <View className=" flex h-full pb-14  justify-between pt-2">
            <View className="">
              <View className="bg-midblue-50 border mb-3 flex-row items-center justify-between  border-neutral-200  px-2 h-16">
                <Text className="text-md font-semibold">
                  Ruta {activeTrip?.route?.name}{' '}
                  {t(
                    TripDirectionText[activeTrip?.route?.direction || 'going']
                  )}{' '}
                  Iniciada
                </Text>
                <View className="flex-row  items-center justify-between">
                  <TouchableOpacity className="flex-row  h-9 w-9 justify-center items-center border border-neutral-900 rounded ">
                    <StyledIcon name="alert-circle" className="h-5 w-5 " />
                  </TouchableOpacity>
                </View>
              </View>
              <List
                data={activeTrip && activeTrip.stops ? activeTrip.stops : data}
                keyExtractor={(item) => String(Math.random())}
                renderItem={renderItem as any}
              />
            </View>
            {showCompleteRoute && (
              <View>
                <TouchableOpacity className="">
                  <Swipeable
                    dragOffsetFromLeftEdge={0}
                    renderLeftActions={renderLeftActions}
                    onSwipeableOpen={(direction: 'left' | 'right') => {
                      if (direction === 'left') {
                        return handleCompleteTrip()
                      }
                    }}>
                    <View className="flex flex-row  items-center    w-full h-20 px-4 justify-between bg-teal-500 ">
                      <View />
                      <Text className="text-2xl text-white font-semibold">
                        Completar ruta
                      </Text>
                      <StyledIcon
                        name="arrowhead-right-outline"
                        className="w-10 h-10"
                        fill={colors.white}
                      />
                    </View>
                  </Swipeable>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      ) : null}
    </>
  )
}

export default StopsList
