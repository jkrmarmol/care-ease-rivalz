import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

export default function FacialVerification() {
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View
      style={{
        paddingVertical: 10,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: "KalekoBold",
          fontSize: 22,
        }}
      >
        Selfie Information
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontFamily: "KalekoBold",
          color: "#00000066",
        }}
      >
        Enter your preferred name in this field. This could be your first name,
        full name, or a nickname that you're comfortable with.
      </Text>

      <TouchableOpacity
        onPress={() => nav.navigate("SelfieCamera")}
        style={[
          {
            backgroundColor: "#0000000D",
            borderRadius: 14,
            overflow: "hidden",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginTop: 20,
          },
        ]}
      >
        <Text
          style={{
            color: "#0095FF",
            fontFamily: "KalekoBold",
            fontSize: 10,
          }}
        >
          Selfie
        </Text>
        <Text
          style={{
            fontFamily: "KalekoBold",
            fontSize: 12,
            paddingVertical: 6,
            opacity: 0.4,
          }}
        >
          Click to open camera
        </Text>
      </TouchableOpacity>
    </View>
  );
}
