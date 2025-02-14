import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/patient/Dashboard";
import HumanModel from "../screens/patient/HumanModel";
import Messages from "../screens/patient/Messages";
import HomeSVG from "../components/reactSVG/HomeSVG";
import HeartSVG from "../components/reactSVG/HeartSVG";
import MessageSVG from "../components/reactSVG/MessageSVG";
import * as NavigationBar from "expo-navigation-bar";
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { setStatusBarStyle, setStatusBarTranslucent } from "expo-status-bar";
import { getApp } from "@react-native-firebase/app";

const Tab = createBottomTabNavigator();

export default function PatientNavigator() {
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  useFocusEffect(() => {
    setTimeout(() => {
      NavigationBar.setBackgroundColorAsync("#fff");
      setStatusBarStyle("dark");
      setStatusBarTranslucent(true);
    }, 0);

    return () => {
      NavigationBar.setBackgroundColorAsync("#fff");
      setStatusBarStyle("dark");
      setStatusBarTranslucent(true);
    };
  });
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "KalekoBold",
          fontSize: 9,
          marginBottom: 10,
        },
        tabBarStyle: {
          height: 60,
          paddingVertical: 10,
        },
      }}
    >
      <Tab.Screen
        component={Dashboard}
        name="Dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <HomeSVG color={focused ? "#0374F8" : "#00000073"} size={focused ? 30 : size} />
          ),
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              // onPress={() => nav.navigate("PatientAccount")}
              onPress={() => {
                getApp().auth().signOut();
                setTimeout(() => {
                  return nav.navigate("AuthNavigators");
                }, 2000);
              }}
              style={{
                left: 15,
              }}
            >
              <Image
                source={require("../assets/images/logo_gradient.png")}
                style={{
                  resizeMode: "contain",
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        component={HumanModel}
        name="HumanModel"
        options={{
          title: "3D Human Model",
          tabBarIcon: ({ color, focused, size }) => (
            <HeartSVG color={focused ? "#0374F8" : "#00000073"} size={focused ? 30 : size} />
          ),
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "3D Human Model",
          headerTitleStyle: {
            fontFamily: "KalekoBold",
          },
          // headerTransparent: true,
        }}
      />
      {/* <Tab.Screen
        component={Messages}
        name="Messages"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <MessageSVG
              color={focused ? "#0374F8" : "#00000073"}
              size={focused ? 30 : size}
            />
          ),
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => nav.navigate("PatientAccount")}
              style={{
                left: 15,
              }}
            >
              <Image
                source={require("../assets/images/logo_gradient.png")}
                style={{
                  resizeMode: "contain",
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
