import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components'
import React from 'react'

import { Home } from '@/screens/Home'
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
      <BottomNavigationTab title="Inicio" icon={<Icon name="home-outline" />} />
      <BottomNavigationTab title="Ruta" icon={<Icon name="car-outline" />} />
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
      <Screen options={{ headerShown: false }} name="route" component={Home} />
      <Screen
        options={{ headerShown: false }}
        name="students"
        component={Students}
      />
      <Screen
        options={{ headerShown: false }}
        name="profile"
        component={Home}
      />
    </Navigator>
  )
}

export default TabsNavigator
