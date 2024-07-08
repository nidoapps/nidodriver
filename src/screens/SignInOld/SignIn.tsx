import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/native'
import { Button, Icon, Input, Text, useTheme } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'

import { styles } from './styles'

import { useDriversContext } from '@/hooks/useDriversContext'
import { t } from '@/locales/i18n'
import { isValidPhone } from '@/utils/common'

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
  iosClientId:
    'com.googleusercontent.apps.588179861015-sud8a3flp5l9tpnhi8a2kc1hlhtpqfpj',
  webClientId:
    '588179861015-p02rbn9gukbikddveceg82qkp3hte4oi.apps.googleusercontent.com',
})

const SignIn = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { navigate } = useNavigation()

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderInputIcon = (props): React.ReactElement => (
    <TouchableOpacity onPress={toggleSecureEntry}>
      <Icon
        {...props}
        fill="#8F9BB3"
        name={!secureTextEntry ? 'eye' : 'eye-off'}
        style={{
          width: 24,
          height: 24,
        }}
      />
    </TouchableOpacity>
  )

  const SignInType = {
    otp: (
      <>
        <Input
          style={styles.input}
          placeholder="6675-3124"
          label={t('common.phone')}
          onChangeText={setPhoneNumber}
          keyboardType="number-pad"
          value={phoneNumber.replace(/(\d{1})(\d{3})(\d{4})/, '$1$2-$3')}
          size="large"
          maxLength={8}
        />
      </>
    ),
    email: (
      <>
        <Input
          style={styles.input}
          placeholder="Correo electrónico"
          label={t('common.email')}
          onChangeText={setEmail}
        />
        <Input
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={secureTextEntry}
          accessoryRight={renderInputIcon}
          label={t('common.password')}
          onChangeText={setPassword}
        />
        <Text category="s2">¿Olvidaste tu contraseña?</Text>
      </>
    ),
  }

  return (
    <SafeAreaView className="bg-white">
      <View className="container   py-20 px-8 h-screen">
        <Text category="h3">{t('signIn.signIn')}</Text>
        <View className="my-6">{SignInType['otp']}</View>
        <View className="w-full">
          <Button
            size="large"
            disabled={!isValidPhone(phoneNumber)}
            onPress={() => navigate('validateOtpCode', { phoneNumber })}>
            <Text category="h2">{t('common.continue')}</Text>
          </Button>
        </View>

        <View className="items-center my-6">
          <Text category="s1">{t('signIn.orSignInWith')}</Text>
        </View>
        <View className="my-10 gap-y-4 w-full">
          <Button
            appearance="outline"
            style={{ backgroundColor: theme['color-basic-100'] }}>
            <Text category="h2">Email</Text>
          </Button>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={() => {}}
          />
        </View>
        {/* <View className="flex-row my-4 gap-x-6">
          <Text category="s1">¿No tienes cuenta aún?</Text>
          <TouchableOpacity>
            <Text category="s1" style={{ color: colors.light.primary }}>
              {t("common.signUp")}
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  )
}

export default SignIn
