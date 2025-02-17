import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import React from "react";
import HeartSVG from "../../reactSVG/HeartSVG";
import DoctorSVG from "../../reactSVG/DoctorSVG";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import QuestionSVG from "../../reactSVG/QuestionSVG";

export default function Services() {
  const { width } = useWindowDimensions();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: (90 / 100) * width,
        alignSelf: "center",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <Text
        style={{
          fontFamily: "KalekoBold",
        }}
      >
        Our Services
      </Text>
      <View
        style={{
          marginTop: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => nav.navigate("HumanModel")}
          style={{
            width: 70,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#0000000D",
              padding: 10,
              borderRadius: 14,
              width: 60,
              height: 60,
            }}
          >
            <HeartSVG color="#000" size={40} />
          </View>
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 10,
              textAlign: "center",
              color: "#00000099",
              marginTop: 6,
            }}
          >
            3D Human Model
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => nav.navigate("PatientAppointment")}
          style={{
            width: 70,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#0000000D",
              padding: 10,
              borderRadius: 14,
              width: 60,
              height: 60,
            }}
          >
            <DoctorSVG color="#000" />
          </View>
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 10,
              textAlign: "center",
              color: "#00000099",
              marginTop: 6,
            }}
          >
            Appointment
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            width: 70,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#0000000D",
              padding: 10,
              borderRadius: 14,
              width: 60,
              height: 60,
            }}
          >
            <QuestionSVG color="#000" size={40} />
          </View>
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 10,
              textAlign: "center",
              color: "#00000099",
              marginTop: 6,
            }}
          >
            Comming Soon!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 70,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#0000000D",
              padding: 10,
              borderRadius: 14,
              width: 60,
              height: 60,
            }}
          >
            <QuestionSVG color="#000" size={40} />
          </View>
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 10,
              textAlign: "center",
              color: "#00000099",
              marginTop: 6,
            }}
          >
            Comming Soon!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
