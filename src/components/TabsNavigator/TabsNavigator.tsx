import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components'
import React from 'react'
import { Image } from 'react-native'

import BusIcon from '@/assets/images/bus.png'
import EditDriverProfileScreen from '@/screens/DriverProfile/DriverProfile'
import { Home } from '@/screens/Home'
import { Routes } from '@/screens/Routes'
import { Students } from '@/screens/Students'

const { Navigator, Screen } = createBottomTabNavigator()

export type RootStackParamList = {
  Home: undefined
  ValidateOtpCode: undefined
  StopDetail: undefined
}
const TabsNavigator = () => {
  const BottomTabBar = ({ navigation, state }: any) => (
    <BottomNavigation
      style={{ height: 90, backgroundColor: 'white' }}
      selectedIndex={state.index}
      appearance="noIndicator"
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab
        title="Nido"
        icon={<Image source={BusIcon} className="w-16 h-10" width={92} />}
      />
      <BottomNavigationTab title="Viajes" icon={<Icon name="swap" />} />
      <BottomNavigationTab
        title="Estudiantes"
        icon={<Icon name="people-outline" />}
      />
      <BottomNavigationTab
        title="Perfil"
        icon={<Icon name="person-outline" />}
      />
    </BottomNavigation>
  )
  // const TabNavigator = () => (
  //   <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
  //     <Screen options={{ headerShown: false }} name="Inicio" component={Home} />
  //     <Screen options={{ headerShown: false }} name="Ruta" component={SignIn} />
  //     <Screen
  //       options={{ headerShown: false }}
  //       name="Notificaciones"
  //       component={Home}
  //     />
  //     <Screen options={{ headerShown: false }} name="Cuenta" component={Home} />
  //   </Navigator>
  // );
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen options={{ headerShown: false }} name="home" component={Home} />
      <Screen
        options={{ headerShown: false }}
        name="routes"
        component={Routes}
      />
      <Screen
        options={{ headerShown: false }}
        name="students"
        component={Students}
      />
      <Screen
        options={{ headerShown: false }}
        name="profile"
        component={EditDriverProfileScreen}
      />
    </Navigator>
  )
}

export default TabsNavigator
