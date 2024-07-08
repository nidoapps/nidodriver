import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/native'
import { Button, Input, Spinner, Text } from '@ui-kitten/components'
import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, View, Image } from 'react-native'

import { styles } from './styles'

import NidoLogoWhite from '@/assets/images/nido-logo-white.png'
import { PhoneNumberInput } from '@/components/PhoneNumberInput'
import { SignInTypes } from '@/constants/common'
import { AuthErrorsMessages } from '@/constants/errors'
import { useDriversContext } from '@/hooks/useDriversContext'
import { t } from '@/locales/i18n'
import { SendOTP, SendOTPEmail } from '@/services/auth'
import { isValidPhone, isValidEmail } from '@/utils/common'

const SignIn = () => {
  const {
    hooks: { handleEmailLogin, handleGoogleSignIn },
    state: { loadingAuth },
  } = useDriversContext()
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('+507')
  const [signInType, setSignInType] = useState(SignInTypes.phoneNumber)
  const [showSignInError, setShowSignInError] = useState('')
  const { navigate } = useNavigation()
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      iosClientId:
        '588179861015-sud8a3flp5l9tpnhi8a2kc1hlhtpqfpj.apps.googleusercontent.com',
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    })
  }, [])

  // const handleEmailSignin = useCallback(async () => {
  //   try {
  //     await handleEmailLogin(email, navigate)
  //   } catch (error) {
  //     console.log('Error:', error)
  //   }
  // }, [email])

  const handleContinueSignIn = useCallback(async () => {
    if (signInType === SignInTypes.phoneNumber) {
      const response = await SendOTP(`${countryCode}${phoneNumber}`)
      if (response) setShowSignInError('')
      return navigate('validateOtpCode', {
        phoneNumber: `${countryCode}${phoneNumber}` as string,
        type: SignInTypes.phoneNumber,
      })
    } else {
      const response = await SendOTPEmail(email)
      if (response && response.sendedOtp) {
        setShowSignInError('')

        return navigate('validateOtpCode', {
          email: email as string,
          type: SignInTypes.email,
        })
      } else if (response && response.error) {
        setShowSignInError(response.type)
      }
    }
  }, [countryCode, navigate, phoneNumber, signInType, email])

  const SignInType: { [key: string]: React.ReactElement } = {
    [SignInTypes.phoneNumber]: (
      <PhoneNumberInput
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        setCountryCode={setCountryCode}
        setPhoneNumber={setPhoneNumber}
        showSignInError={
          showSignInError ? t(AuthErrorsMessages[showSignInError || '']) : ''
        }
      />
    ),
    [SignInTypes.email]: (
      <View className="mb-4">
        <Input
          style={styles.input}
          placeholder="Correo electrónico"
          label={t('common.email')}
          size="large"
          onChangeText={(value) => setEmail(value.toLowerCase())}
          status={email && !isValidEmail(email) ? 'danger' : 'basic'}
          caption={() => (
            <>
              {(email && !isValidEmail(email)) || showSignInError ? (
                <Text category="c1" status="danger">
                  {showSignInError
                    ? t(AuthErrorsMessages[showSignInError])
                    : t('signIn.incorrectEmail')}
                </Text>
              ) : null}
            </>
          )}
        />
      </View>
    ),
  }

  const SecondarySigninType: { [key: string]: React.ReactElement } = {
    [SignInTypes.phoneNumber]: (
      <Button
        appearance="outline"
        onPress={() => setSignInType(SignInTypes.email)}>
        <Text category="h2">{t('common.email')}</Text>
      </Button>
    ),
    [SignInTypes.email]: (
      <Button
        appearance="outline"
        onPress={() => setSignInType(SignInTypes.phoneNumber)}>
        <Text category="h2">{t('common.phoneNumber')}</Text>
      </Button>
    ),
  }

  const enableContinue = React.useMemo(() => {
    if (signInType === SignInTypes.phoneNumber) {
      return isValidPhone(phoneNumber, countryCode)
    } else {
      return isValidEmail(email)
    }
  }, [signInType, phoneNumber, countryCode, email])

  return (
    <View className="bg-white flex-1">
      <View className="h-1/4 bg-midblue-500 justify-center items-center pt-12">
        <Image
          source={NidoLogoWhite}
          className="w-36 h-32 justify-center mx-auto mb-4"
        />
      </View>
      <View className="px-8 mt-8 h-3/4">
        <Text category="h3">{t('signIn.signIn')}</Text>
        <View className="my-2">{SignInType[signInType]}</View>
        <Button
          accessoryRight={
            loadingAuth && (
              <View className="mr-2">
                <Spinner size="small" status="basic" />
              </View>
            )
          }
          size="large"
          disabled={!enableContinue || loadingAuth}
          onPress={() => handleContinueSignIn()}>
          <Text category="h2">{t('common.continue')}</Text>
        </Button>

        <View className="items-center my-6">
          <Text category="s1">{t('signIn.orSignInWith')}</Text>
        </View>
        {SecondarySigninType[signInType]}
        <View className=" w-full justify-center items-center mx-auto my-6 px-8">
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={() => handleGoogleSignIn(navigate)}
            style={{
              width: Dimensions.get('window').width - 60,
              height: 48,
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default SignIn
