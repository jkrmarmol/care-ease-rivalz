import React from "react";
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setStatusBarStyle, setStatusBarTranslucent, setStatusBarBackgroundColor } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { getApp } from "@react-native-firebase/app";

export default function Authentication() {
  const { width, height } = useWindowDimensions();
  const nav = useNavigation<NavigationProp<ParamListBase>>();

  useFocusEffect(() => {
    getApp()
      .auth()
      .onAuthStateChanged((user) => {
        if (user?.uid) {
          setStatusBarStyle("dark");
          setStatusBarTranslucent(true);
          setStatusBarBackgroundColor("#fff", true);
          NavigationBar.setBackgroundColorAsync("#0374F8");
          return nav.navigate("PatientNavigator");
        }
        return null;
      });

    setTimeout(() => {
      setStatusBarStyle("light");
      setStatusBarTranslucent(true);
      setStatusBarBackgroundColor("#0374F8", true);
      NavigationBar.setBackgroundColorAsync("#0374F8");
    }, 0);

    return () => {
      setStatusBarStyle("dark");
      setStatusBarTranslucent(true);
      NavigationBar.setBackgroundColorAsync("#00000000");
    };
  });
  return (
    <View
      style={{
        backgroundColor: "#0374F8",
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          width: (90 / 100) * width,
          alignSelf: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            marginTop: (26 / 100) * height,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/images/white_logo.png")}
                style={{
                  resizeMode: "contain",
                  width: 60,
                  height: 60,
                }}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 48,
                  fontFamily: "KalekoBold",
                  marginLeft: 10,
                }}
              >
                CareEase
              </Text>
            </View>
            <Text
              style={{
                color: "#fff",
                fontFamily: "CenturyGothicRegular",
                fontSize: 14,
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              Navigate Pain, Find answers: Your Body, Your 3D Health Companion.
            </Text>
          </View>
          <View
            style={{
              gap: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => nav.navigate("Login")}
              style={{
                backgroundColor: "#fff",
                paddingVertical: 18,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  color: "#0374F8",
                  textAlign: "center",
                  fontFamily: "CenturyGothicBold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => nav.navigate("SelectRole")}
              style={{
                backgroundColor: "#fff",
                paddingVertical: 18,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  color: "#0374F8",
                  textAlign: "center",
                  fontFamily: "CenturyGothicBold",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            fontFamily: "KalekoBold",
            color: "#fff",
            fontSize: 9,
            textAlign: "center",
            width: (80 / 100) * width,
            alignSelf: "center",
            marginVertical: 10,
            opacity: 0.7,
          }}
        >
          CareEase by Kuma Technologes, Your simple, smart health management app.
        </Text>
      </SafeAreaView>
    </View>
  );
}
