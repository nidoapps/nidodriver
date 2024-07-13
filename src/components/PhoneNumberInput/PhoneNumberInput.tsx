import { Input, Text } from '@ui-kitten/components'
import React, { useRef, useState } from 'react'
import { Keyboard, TouchableOpacity, View } from 'react-native'
import { CountryPicker } from 'react-native-country-codes-picker'

import { t } from '@/locales/i18n'
import { isValidPhone } from '@/utils/common'

interface PhoneNumberInputProps {
  countryCode: string
  phoneNumber: string
  setCountryCode: (code: string) => void
  setPhoneNumber: (number: string) => void
  showSignInError?: boolean
}

const PhoneNumberInput = ({
  countryCode,
  phoneNumber,
  setCountryCode,
  setPhoneNumber,
  showSignInError,
}: PhoneNumberInputProps) => {
  const [show, setShow] = useState(false)

  const phoneInput = useRef(null)
  return (
    <View className="w-full flex flex-row my-4 justify-between items-center">
      <View
        className="flex justify-end w-1/5 h-16 items-center"
        ref={phoneInput}>
        <TouchableOpacity
          className=" border-neutral-300 border w-full rounded h-12  py-3 px-1 items-center justify-center "
          onPress={() => setShow(true)}>
          <Text className="text-neutral-500">{countryCode}</Text>
        </TouchableOpacity>
        <CountryPicker
          ListHeaderComponent={() => (
            <TouchableOpacity onPress={() => setShow(false)} />
          )}
          show={show}
          lang="es"
          enableModalAvoiding
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code)
            setShow(false)
          }}
          showOnly={['PA', 'CO', 'US']}
          searchMessage="Busca tu país"
        />
        {phoneNumber && !isValidPhone(phoneNumber, countryCode) ? (
          <View className="h-1" />
        ) : null}
      </View>
      <View className="w-3/4">
        <Input
          placeholder=""
          label={t('common.phone')}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          value={phoneNumber}
          size="large"
          onBlur={() => Keyboard.dismiss()}
          status={
            phoneNumber && !isValidPhone(phoneNumber, countryCode)
              ? 'danger'
              : 'basic'
          }
          caption={() => (
            <>
              {(phoneNumber && !isValidPhone(phoneNumber, countryCode)) ||
              showSignInError ? (
                <Text category="c1" status="danger">
                  {showSignInError
                    ? t(showSignInError)
                    : t('signIn.incorrectPhone')}
                </Text>
              ) : null}
            </>
          )}
        />
      </View>
    </View>
  )
}

export default PhoneNumberInput
