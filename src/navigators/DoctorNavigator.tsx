import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/doctor/Home";
import Appointment from "../screens/doctor/Appointment";
import Messages from "../screens/doctor/Messages";
import HomeSVG from "../components/reactSVG/HomeSVG";
import { TouchableOpacity, Image } from "react-native";
import MessageSVG from "../components/reactSVG/MessageSVG";
import CalendarSVG from "../components/reactSVG/CalendarSVG";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

export default function DoctorNavigator() {
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <Tabs.Navigator
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
      <Tabs.Screen
        component={Home}
        name="Home"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <HomeSVG
              color={focused ? "#0374F8" : "#00000073"}
              size={focused ? 30 : size}
            />
          ),
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => nav.navigate("DoctorAccount")}
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
      <Tabs.Screen
        component={Appointment}
        name="Appointment"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <CalendarSVG
              color={focused ? "#0374F8" : "#00000073"}
              size={focused ? 30 : size}
            />
          ),
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
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
      <Tabs.Screen
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
    </Tabs.Navigator>
  );
}
