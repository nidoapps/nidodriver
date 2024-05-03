import { useNavigation } from '@react-navigation/native'
import { Icon, List, ListItem } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useState } from 'react'
import { TouchableOpacity, View, Text, ImageProps } from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist'
import { SafeAreaView } from 'react-native-safe-area-context'

import MapTest from '../MapTest/MapTest'

import { t } from '@/locales/i18n'
import { PickupStops } from '@/mocks/stops'
import { IStop, StopStatus } from '@/models/common'
import { colors } from '@/themeColors'

const StyledIcon = styled(Icon)

const StopsList = () => {
  const { navigate } = useNavigation()
  const [data, setData] = useState(PickupStops)

  const pulseIconRef = React.useRef<Icon<Partial<ImageProps>>>()
  React.useEffect(() => {
    pulseIconRef?.current?.startAnimation()
  }, [])

  const statusClasses: { [key: string]: string } = {
    [StopStatus.pending]: 'border-neutral-300 bg-neutral-50',
    [StopStatus.active]: ' border-neutral-300 bg-white ',
    [StopStatus.completed]: 'border-neutral-300 bg-neutral-50 opacity-70',
  }

  const statusIcons: { [key: string]: string } = {
    [StopStatus.pending]: 'radio-button-off',
    [StopStatus.active]: 'radio-button-on',
    [StopStatus.completed]: 'checkmark-circle-2',
  }

  const statusIconsColors: { [key: string]: string } = {
    [StopStatus.pending]: colors.grey,
    [StopStatus.active]: colors.primary,
    [StopStatus.completed]: colors.success,
  }

  const renderItem = ({ item, index }: any): React.ReactElement => {
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigate('studentDetail', {
              stopId: item.id,
              stopTitle: item.title,
            })
          }
          className={`h-20  px-3 py-4 mx-2 border-2 flex-row items-center justify-between rounded-lg my-1 ${statusClasses[item.status]}`}>
          <View className=" flex-row items-center justify-center mr-2 gap-x-2">
            <Text className="font-semibold text-lg text-neutral-800">
              {index + 1}
            </Text>
            <View className="">
              <Text className="text-lg font-semibold text-neutral-800">
                {item.title}
              </Text>
              <View className="flex ">
                <View className="items-center flex-row">
                  <StyledIcon
                    fill={colors.light.darkGrey2}
                    className="h-4 w-4 fill-neutral-300 "
                    name="pin"
                  />
                  <Text className="text-sm !text-neutral-700">
                    {' '}
                    {t('common.address')}: {item.address}
                  </Text>
                </View>

                <View className="items-center flex-row">
                  <StyledIcon
                    fill={colors.light.darkGrey2}
                    className="h-4 w-4 !fill-neutral-300"
                    name="people"
                  />
                  <Text className="text-sm !text-neutral-700">
                    {t('common.students')}: {item.students.length}
                    {item.status === 'completed' && (
                      <>
                        /
                        {
                          item.students.filter(
                            (student) => student.stopStatus === 'completed'
                          ).length
                        }
                      </>
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="h-20 items-center justify-center mr-2">
            <StyledIcon
              fill={statusIconsColors[item.status]}
              name={statusIcons[item.status]}
              className="h-6 w-6"
            />
          </View>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View className=" h-full pt-2">
      <View className="bg-midblue-50 border mb-3 flex-row items-center justify-between  border-neutral-200  px-2 h-16">
        <Text className="text-md font-semibold">
          Ruta Costa del Este Ida Iniciada
        </Text>
        <View className="flex-row  items-center justify-between">
          <TouchableOpacity className="flex-row  h-9 w-9 justify-center items-center border border-neutral-900 rounded ">
            <StyledIcon name="alert-circle" className="h-5 w-5 " />
          </TouchableOpacity>
        </View>
      </View>
      <List
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem as any}
      />
    </View>
  )
}

export default StopsList
