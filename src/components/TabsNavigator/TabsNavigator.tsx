import React from "react";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@/screens/Home";
import { SignIn } from "@/screens/SignIn";

const { Navigator, Screen } = createBottomTabNavigator();

export type RootStackParamList = {
  Home: undefined;
  ValidateOtpCode: undefined;
};
const TabsNavigator = () => {
  const BottomTabBar = ({ navigation, state }: any) => (
    <BottomNavigation
      style={{ height: 100 }}
      selectedIndex={state.index}
      appearance="noIndicator"
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="Inicio" icon={<Icon name="home-outline" />} />
      <BottomNavigationTab title="Ruta" icon={<Icon name="car-outline" />} />
      <BottomNavigationTab
        title="Notificaciones"
        icon={<Icon name="bell-outline" />}
      />
      <BottomNavigationTab
        title="Cuenta"
        icon={<Icon name="person-outline" />}
      />
    </BottomNavigation>
  );
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
      <Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Screen
        options={{ headerShown: false }}
        name="Login"
        component={SignIn}
      />
    </Navigator>
  );
};

export default TabsNavigator;
