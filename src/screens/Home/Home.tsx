import { Icon } from '@ui-kitten/components'
import { styled } from 'nativewind'
import React, { useCallback, useMemo, useRef } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { StopsList } from '@/components/StopsList'
import { useDriversContext } from '@/hooks/useDriversContext'

const StyledIcon = styled(Icon)

const Home = () => {
  return (
    <SafeAreaView className="flex flex-1 bg-neutral-50">
      <View className="">
        <View className="bg-midblue-50 border flex-row items-center justify-between  border-neutral-200  px-2 h-16">
          <Text className="text-md font-semibold">
            Ruta Costa del Este Ida Iniciada
          </Text>
          <View className="flex-row  items-center justify-between">
            <TouchableOpacity className="flex-row  h-9 w-9 justify-center items-center border border-neutral-900 rounded ">
              <StyledIcon name="alert-circle" className="h-5 w-5 " />
            </TouchableOpacity>
          </View>
        </View>
        <StopsList />
      </View>
    </SafeAreaView>
  )
}

export default Home
