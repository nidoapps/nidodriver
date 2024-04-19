import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import BackButton from "@/components/BackButton/BackButton";
import { TabsNavigator } from "@/components/TabsNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "@/screens/SignIn";

const Stack = createStackNavigator();

type ScreenRouteProp = RouteProp<RootStackParams, "signin">;

const MainNavigation = () => {
  let initialRoute = "signin";
  const isAuth = false;

  if (isAuth) {
    initialRoute = "main";
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          headerTransparent: true,
          headerTitle: "",
          headerLeft: (props) => (
            <BackButton
              {...props}
              params={route.params}
              navigation={navigation}
            />
          ),
        })}
      >
        {!isAuth ? (
          <Stack.Screen
            name="signin"
            component={SignIn}
            initialParams={{ arrowDark: true }}
            options={{
              headerShown: false,
            }}
          />
        ) : null}

        {isAuth ? (
          <>
            <Stack.Screen
              name="main"
              component={TabsNavigator}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
