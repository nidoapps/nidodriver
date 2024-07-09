import { RouteProp, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text } from 'react-native'

import { RootStackParams } from './NavigationParams'

import { storage } from '@/App'
import BackButton from '@/components/BackButton/BackButton'
import { ModalCheckinEstudent } from '@/components/ModalCheckinEstudent'
import { TabsNavigator } from '@/components/TabsNavigator'
import { useDriversContext } from '@/hooks/useDriversContext'
import EditDriverProfileScreen from '@/screens/DriverProfile/DriverProfile'
import { Home } from '@/screens/Home'
import { Routes } from '@/screens/Routes'
import { SignIn } from '@/screens/SignIn'
import { StopDetail } from '@/screens/StopDetail'
import { StudentDetail } from '@/screens/StudentDetail'
import { Students } from '@/screens/Students'
import { ValidateOtpCode } from '@/screens/ValidateOtpCode'

const Stack = createStackNavigator()

type ScreenRouteProp = RouteProp<RootStackParams, 'main'>

const MainNavigation = () => {
  const {
    state: { isAuth },
  } = useDriversContext()

  let initialRoute = 'default'

  const authToken = storage.getString('authToken')
  const userId = storage.getString('userId')

  if (authToken && userId) {
    initialRoute = 'main'
  } else {
    initialRoute = 'signIn'
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          headerTransparent: true,
          headerTitle: '',
          headerLeft: (props) => (
            <BackButton
              {...props}
              params={route.params}
              navigation={navigation}
            />
          ),
        })}>
        <Stack.Screen
          name="signIn"
          component={SignIn}
          initialParams={{ arrowDark: true }}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="main"
          component={TabsNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="stopDetail"
          component={StopDetail}
          initialParams={{ arrowDark: true }}
          options={({ route: { params: paramsStack } }) => ({
            headerShown: true,
            headerTransparent: false,
            headerTitle: () => {
              const { stopId, stopTitle } = paramsStack
              return <Text className="text-md font-semibold"> {stopTitle}</Text>
            },
            gestureEnabled: true,
          })}
        />
        <Stack.Screen
          name="students"
          component={Students}
          initialParams={{ arrowDark: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="routes"
          component={Routes}
          initialParams={{ arrowDark: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          component={EditDriverProfileScreen}
          initialParams={{ arrowDark: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="studentDetail"
          component={StudentDetail}
          initialParams={{ arrowDark: true }}
          options={({ route: { params: paramsStack } }) => ({
            headerShown: true,
            headerTransparent: false,
            headerTitle: () => {
              const { stopId, stopTitle } = paramsStack
              return <Text className="text-md font-semibold"> {stopTitle}</Text>
            },
            gestureEnabled: true,
          })}
        />

        <Stack.Screen
          name="validateOtpCode"
          component={ValidateOtpCode}
          initialParams={{ arrowDark: true }}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="modalCheckin"
          component={ModalCheckinEstudent}
          options={{
            // Set the presentation mode to modal for our modal route.
            presentation: 'modal',
            gestureResponseDistance: 100,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
