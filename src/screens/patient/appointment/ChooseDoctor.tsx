import { View, Text, TextInput, useWindowDimensions, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import { viewAllDoctors } from "../../../store/patient/appointmentSlice";
import ChooseDoctorList from "./ChooseDoctorList";

export default function ChooseDoctor() {
  const { width, height } = useWindowDimensions();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const selectViewAllDoctors = useAppSelector((state) => state.patientAppointment.viewAllDoctors);

  useEffect(() => {
    (async () => {
      dispatch(viewAllDoctors());
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
              marginBottom: 10,
            }}
          >
            Choose Doctor
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectViewAllDoctors.status === "ok" &&
              selectViewAllDoctors.response.map((e, index) => <ChooseDoctorList key={index} {...e} />)}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
