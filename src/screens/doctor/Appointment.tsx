import { View, Text, ScrollView, useWindowDimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionModal from "../../components/doctor/appointment/ActionModal";
import ItemList from "../../components/doctor/appointment/ItemList";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { viewAllAppointment } from "../../store/doctor/appointmentSlice";

export default function Appointment() {
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const selectAppointmentList = useAppSelector((state) => state.doctorAppointment.viewAllAppointment);
  const selectAppointmentAction = useAppSelector((state) => state.doctorAppointment.actionAppointment);

  useEffect(() => {
    (async () => {
      dispatch(viewAllAppointment());
    })();
  }, [selectAppointmentAction]);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: (90 / 100) * width,
            height: (75 / 100) * height,
            alignSelf: "center",
            padding: 20,
            borderRadius: 12,
            marginBottom: 10,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "KalekoBold",
              marginBottom: 20,
            }}
          >
            List of appointments
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 12,
                color: "#00000073",
              }}
            >
              PATIENT
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
              ACTION
            </Text>
          </View>
          <ScrollView>
            {selectAppointmentList.status === "ok" &&
              selectAppointmentList.response.map((e, index) => <ItemList {...e} key={index} />)}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
