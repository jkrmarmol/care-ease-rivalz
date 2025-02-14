import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Intro from "../screens/auth/Intro";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Authentication from "../screens/auth/Authentication";
import SelectRole from "../screens/auth/SelectRole";

const Stack = createNativeStackNavigator();

export default function AuthNavigators() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={Authentication} name="Authentication" />
      <Stack.Screen
        component={Login}
        name="Login"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen component={Intro} name="Intro" />
      <Stack.Screen
        component={Register}
        name="Register"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        component={SelectRole}
        name="SelectRole"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
}
