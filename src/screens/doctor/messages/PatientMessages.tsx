import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { IDoctorViewPatientMessages } from "../../../typings/interface";

export default function PatientMessages(data: IDoctorViewPatientMessages) {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        padding: 14,
        backgroundColor: "#0000000D",
        width: (60 / 100) * width,
        borderRadius: 12,
        alignSelf: "flex-start",
        marginVertical: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "KalekoBook",
          fontSize: 12,
          lineHeight: 16,
          textAlign: "left",
        }}
      >
        {data.message}
      </Text>
    </View>
  );
}
