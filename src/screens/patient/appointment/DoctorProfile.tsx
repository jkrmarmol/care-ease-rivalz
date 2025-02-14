import React from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import {
  useFocusEffect,
  DefaultTheme,
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DoctorProfile() {
  const { width, height } = useWindowDimensions();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  useFocusEffect(() => {
    setTimeout(() => {
      NavigationBar.setBackgroundColorAsync("#fff");
    }, 0);
    return () => {
      NavigationBar.setBackgroundColorAsync("#fff");
    };
  });
  return (
    <View
      style={{
        ...DefaultTheme.colors,
        backgroundColor: "transparent",
        flex: 1,
      }}
    >
      <View
        style={{
          position: "relative",
        }}
      >
        <Image
          source={{
            uri: "https://www.shutterstock.com/image-vector/cute-medical-seamless-pattern-perfect-600nw-2314451115.jpg",
          }}
          style={{
            height: (30 / 100) * height,
            resizeMode: "cover",
            width,
          }}
        />
        <Image
          source={{
            uri: "https://st3.depositphotos.com/1432405/12513/v/450/depositphotos_125136404-stock-illustration-doctor-icon-flat-style.jpg",
          }}
          style={{
            resizeMode: "contain",
            height: 100,
            width: 100,
            borderRadius: 100,
            borderWidth: 6,
            borderColor: "#fff",
            position: "absolute",
            bottom: -50,
            left: (5 / 100) * width,
            backgroundColor: "#fff",
          }}
        />
      </View>
      <SafeAreaView
        style={{
          width: (90 / 100) * width,
          alignSelf: "center",
          marginTop: 10,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "KalekoBold",
            fontSize: 20,
            marginTop: 6,
          }}
        >
          Juan Dela Cruz
        </Text>
        <Text
          style={{
            fontFamily: "KalekoBold",
            opacity: 0.5,
          }}
        >
          Endocrinologist, Nephrologist, Attending physician, Cardiologist
        </Text>
        <TouchableOpacity
          onPress={() => nav.navigate("PatientMessageItem")}
          style={{
            backgroundColor: "#0095FF",
            paddingVertical: 14,
            borderRadius: 12,
            marginTop: 40,
          }}
        >
          <Text
            style={{
              fontFamily: "CenturyGothicBold",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Send Message
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
