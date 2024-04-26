import { RouteProp, useNavigation } from '@react-navigation/native'
import { Button, Input, Text } from '@ui-kitten/components'
import React, { useState, useRef } from 'react'
import { SafeAreaView, View, TextInput } from 'react-native'

import { t } from '@/locales/i18n'
import { RootStackParams } from '@/navigation/NavigationParams'

interface ValidateOtpCodeProps {
  route: RouteProp<RootStackParams, 'validateOtpCode'>
}

const ValidateOtpCode = ({ route }: ValidateOtpCodeProps) => {
  const [otpCode, setOtp] = useState<any[]>([null, null, null, null])
  const inputRefs = useRef<(TextInput | null)[]>([null, null, null, null])
  const { phoneNumber } = route.params || {}
  const { navigate } = useNavigation()

  const handleInputChange = (value: any, index: number) => {
    const updatedOtp = [...otpCode]
    updatedOtp[index] = value
    setOtp(updatedOtp)

    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }
  return (
    <SafeAreaView className="bg-white">
      <View className="flex items-center py-20 px-8 h-screen">
        <View className="gap-y-4 items-center text-center">
          <Text category="h6">{t('signIn.inputOtpCode')}</Text>
          <Text category="c1">
            {t('signIn.otpCodeWasSent')}{' '}
            <Text category="s2">{phoneNumber}</Text>
          </Text>
        </View>
        <View className="flex flex-row justify-center gap-x-4 items-center my-14">
          {otpCode.map((value, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={value}
              onChangeText={(value) => handleInputChange(value, index)}
              maxLength={1}
              keyboardType="number-pad"
              className="w-14 border border-solid border-gray-300 rounded-lg h-14 text-center focus:border-teal-500"
              textAlign="center"
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleInputChange('', index)
                }
              }}
            />
          ))}
        </View>
        <View className="w-full gap-y-2">
          <Button size="large" appearance="ghost">
            <Text category="s2" className="mt-4">
              {t('signIn.resendCode')}
            </Text>
          </Button>
          <Button
            size="large"
            disabled={otpCode.some((e) => !e)}
            onPress={() => navigate('main')}>
            <Text category="h2"> {t('common.continue')} </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ValidateOtpCode
