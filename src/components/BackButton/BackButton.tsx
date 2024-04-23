import { NavigationProp } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import { Icon } from '@ui-kitten/components'
import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'

import { RootStackParams } from '@/navigation/NavigationParams'

interface BackButtonProps {
  params?: object
  navigation: NavigationProp<RootStackParams>
  onPress?: () => void
  overrideBack?: RootStackParams
  canGoBack?: boolean
}

const BackButton = ({
  onPress,
  canGoBack,
  params = {},
  navigation: { navigate },
  overrideBack,
}: BackButtonProps) => {
  const handlePress = useCallback(() => {
    if (overrideBack) {
      navigate(overrideBack as any, params)
    } else if (onPress) {
      onPress()
    }
  }, [overrideBack, navigate, onPress, params])

  if (!canGoBack) {
    return null
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon
        name="chevron-left-outline"
        fill="#000"
        style={{
          width: 32,
          height: 32,
        }}
      />
    </TouchableOpacity>
  )
}

export default BackButton
