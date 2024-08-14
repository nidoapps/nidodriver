import { RouteProp, useNavigation } from '@react-navigation/native'
import { Button } from '@ui-kitten/components'
import React, { useState, useRef, useCallback } from 'react'
import { SafeAreaView, View, TextInput, Text } from 'react-native'

import { useDriversContext } from '@/hooks/useDriversContext'
import { t } from '@/locales/i18n'
import { RootStackParams } from '@/navigation/NavigationParams'
import { SendOTP, SendOTPEmail } from '@/services/auth'

interface ValidateOtpCodeProps {
  route: RouteProp<RootStackParams, 'validateOtpCode'>
}

const ValidateOtpCode = ({ route }: ValidateOtpCodeProps) => {
  const [otpCode, setOtp] = useState<any[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ])
  const inputRefs = useRef<(TextInput | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ])
  const { phoneNumber, type, email } = route.params || {}
  const { navigate } = useNavigation()
  const [errorValidatingCode, setErrorValidatingCode] = useState(false)
  const {
    hooks: { handlePhoneNumberLogin, handleEmailLogin },
  } = useDriversContext()

  const handleInputChange = (value: any, index: number) => {
    const updatedOtp = [...otpCode]
    updatedOtp[index] = value
    setOtp(updatedOtp)

    if (value && index < 53 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResendCode = useCallback(async () => {
    setErrorValidatingCode(false)
    setOtp([null, null, null, null, null, null])
    if (type === 'email') {
      return await SendOTPEmail(email)
    }
    await SendOTP(String(phoneNumber))
  }, [phoneNumber])

  const handleValidateOtp = useCallback(async () => {
    const code = otpCode.join('')
    try {
      if (type === 'email') {
        return await handleEmailLogin(email, code, navigate)
      } else {
        await handlePhoneNumberLogin(phoneNumber, code, navigate)
      }
      setOtp([null, null, null, null, null, null])
    } catch (error) {
      console.log('Error:', error)
      setErrorValidatingCode(true)
    }
  }, [otpCode, handlePhoneNumberLogin, phoneNumber, navigate])

  return (
    <SafeAreaView className="bg-white">
      <View className="flex items-center py-14 px-6 h-screen">
        <View className="gap-y-4 items-center text-center">
          <Text className="text-lg font-semibold">
            {t('signIn.inputOtpCode')}
          </Text>
          <Text>
            {t('signIn.otpCodeWasSent')}{' '}
            <Text className="text-base">{phoneNumber || email}</Text>
          </Text>
        </View>
        <View className="flex flex-row justify-center gap-x-4 items-center my-8">
          {otpCode.map((value, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={value}
              onChangeText={(value) => handleInputChange(value, index)}
              maxLength={1}
              keyboardType="number-pad"
              className={`w-11 border border-solid border-gray-300 rounded-lg h-14 text-center focus:border-teal-500 ${errorValidatingCode && 'border-error-100'}`}
              textAlign="center"
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleInputChange('', index)
                }
              }}
            />
          ))}
        </View>
        {errorValidatingCode ? (
          <Text className=" text-error-100 ">{t('signIn.errors.otp')}</Text>
        ) : null}
        <View className="w-full gap-y-2">
          <Button
            size="large"
            appearance="ghost"
            onPress={() => handleResendCode()}>
            <Text className="mt-4">{t('signIn.resendCode')}</Text>
          </Button>
          <Button
            size="large"
            disabled={otpCode.some((e) => !e)}
            onPress={() => handleValidateOtp()}>
            <Text> {t('common.continue')} </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ValidateOtpCode
