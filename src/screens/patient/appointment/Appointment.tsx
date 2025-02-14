import { View, Text, TextInput, useWindowDimensions, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import { viewAllAppointment } from "../../../store/patient/appointmentSlice";
import AppointmentList from "./AppointmentList";

export default function Appointment() {
  const dispatch = useAppDispatch();
  const { width, height } = useWindowDimensions();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const selectViewAllAppointment = useAppSelector((state) => state.patientAppointment.viewAllAppointment);

  useEffect(() => {
    (async () => {
      await dispatch(viewAllAppointment());
    })();
  }, []);
  return (
    <View>
      <SafeAreaView style={{ width: (90 / 100) * width, alignSelf: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              padding: 10,
              alignItems: "center",
              flexGrow: 1,
              flex: 1,
              borderRadius: 12,
            }}
          >
            <Feather name="search" size={24} color="black" />
            <TextInput
              placeholder="Search doctors..."
              placeholderTextColor={"#0000004D"}
              style={{
                flex: 1,
                marginLeft: 10,
                fontFamily: "KalekoBold",
                fontSize: 12,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => nav.navigate("PatientChooseDoctor")}
            style={{
              backgroundColor: "#0374F8",
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              flexGrow: 0,
              paddingHorizontal: 14,
            }}
          >
            <AntDesign name="plus" size={24} color="#fff" />
            <Text style={{ fontFamily: "KalekoBold", color: "#fff", fontSize: 12 }}>New</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            width: (90 / 100) * width,
            alignSelf: "center",
            padding: 20,
            borderRadius: 12,
            height: (70 / 100) * height,
          }}
        >
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 14,
            }}
          >
            List of appointment
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 12,
                color: "#00000073",
              }}
            >
              DOCTOR
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 12,
                color: "#00000073",
              }}
            >
              DATE
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 12,
                color: "#00000073",
              }}
            >
              STATUS
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectViewAllAppointment.status === "ok" &&
              selectViewAllAppointment.response.map((e, index) => <AppointmentList key={index} {...e} />)}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
