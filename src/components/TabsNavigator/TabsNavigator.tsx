import React from "react";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@/screens/Home";

const { Navigator, Screen } = createBottomTabNavigator();

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};
const TabsNavigator = () => {
  const BottomTabBar = ({ navigation, state }: any) => (
    <BottomNavigation
      style={{ height: 80 }}
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
  const TabNavigator = () => (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen options={{ headerShown: false }} name="Inicio" component={Home} />
      <Screen options={{ headerShown: false }} name="Ruta" component={Home} />
      <Screen
        options={{ headerShown: false }}
        name="Notificaciones"
        component={Home}
      />
      <Screen options={{ headerShown: false }} name="Cuenta" component={Home} />
    </Navigator>
  );
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default TabsNavigator;
