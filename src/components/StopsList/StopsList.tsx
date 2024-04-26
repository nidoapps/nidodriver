import { useNavigation } from '@react-navigation/native'
import { Icon, ListItem } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useState } from 'react'
import { TouchableOpacity, View, Text, ImageProps } from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist'

import { t } from '@/locales/i18n'
import { stops } from '@/mocks/stops'
import { IStop, StopStatus } from '@/models/common'
import { colors } from '@/themeColors'

const StyledIcon = styled(Icon)

const StopsList = () => {
  const { navigate } = useNavigation()
  const [data, setData] = useState(stops)

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

  const renderDraggableItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<any>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onPress={() =>
            navigate('stopDetail', { stopId: item.id, stopTitle: item.title })
          }
          onLongPress={drag}
          disabled={isActive}
          className={`h-20  px-3 py-4 mx-2 border-2 flex-row items-center justify-between rounded-lg my-1 ${statusClasses[item.status]} ${isActive && 'bg-teal-50'}`}>
          <View className=" flex-row items-center justify-center mr-2 gap-x-2">
            <Text className="font-semibold text-lg">{item.index}</Text>
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
                    {' '}
                    {t('common.students')}: {item.students.length}
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
      </ScaleDecorator>
    )
  }

  return (
    <>
      <Text className="my-2 text-semibold ml-2 text-base">
        Orden de Paradas en la ruta
      </Text>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderDraggableItem as any}
      />
    </>
  )
}

export default StopsList
