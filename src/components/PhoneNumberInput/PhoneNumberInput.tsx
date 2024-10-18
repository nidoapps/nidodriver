import { Input, Text } from '@ui-kitten/components'
import React, { useRef, useState } from 'react'
import {
  Keyboard,
  TouchableOpacity,
  View,
  Text as TextNative,
} from 'react-native'
import { CountryPicker } from 'react-native-country-codes-picker'

import i18n, { t } from '@/locales/i18n'
import { styles } from '@/screens/SignIn/styles'
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
    <View
      ref={phoneInput}
      className="w-full flex flex-row my-4 justify-between  gap-x-2">
      <View className="w-1/5">
        <TextNative className="text-neutral-500 font-bold text-xs mb-1">
          Prefijo
        </TextNative>
        <TouchableOpacity
          className=" border-neutral-300 border w-full rounded h-12 py-3  items-center  "
          onPress={() => setShow(true)}>
          <TextNative className="text-neutral-500 ">{countryCode}</TextNative>
        </TouchableOpacity>

        <CountryPicker
          ListHeaderComponent={() => (
            <TouchableOpacity onPress={() => setShow(false)} />
          )}
          show={show}
          lang={i18n.locale}
          enableModalAvoiding
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code)
            setShow(false)
          }}
          showOnly={['PA', 'CO', 'US']}
          searchMessage="Busca tu país"
        />

        {/* {phoneNumber && !isValidPhone(phoneNumber, countryCode) ? (
          <View className="h-1" />
        ) : null} */}
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
            <View className="w-full">
              {(phoneNumber && !isValidPhone(phoneNumber, countryCode)) ||
              showSignInError ? (
                <Text category="c1" status="danger">
                  {showSignInError
                    ? t(showSignInError)
                    : t('signIn.incorrectPhone')}
                </Text>
              ) : null}
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default PhoneNumberInput
