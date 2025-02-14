import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { setStatusBarStyle, setStatusBarTranslucent } from "expo-status-bar";
import SelectRolePatientModal from "../../components/auth/SelectRolePatientModal";
import SelectRoleDoctorModal from "../../components/auth/SelectRoleDoctorModal";
import type { TRegisterSliceInitialState } from "../../typings/types";
import * as NavigationBar from "expo-navigation-bar";

export default function SelectRole() {
  const { width, height } = useWindowDimensions();
  const [roleInformation, setRoleInformation] = useState({
    patient: false,
    doctor: false,
  });
  const onPressRole = (role: TRegisterSliceInitialState) => {
    if (role === "doctor") {
      setRoleInformation((prev) => ({ ...prev, patient: false, doctor: true }));
    }
    if (role === "patient") {
      setRoleInformation((prev) => ({ ...prev, patient: true, doctor: false }));
    }
  };
  useFocusEffect(() => {
    setTimeout(() => {
      NavigationBar.setBackgroundColorAsync("#0374F8");
      setStatusBarStyle("light");
      setStatusBarTranslucent(true);
    });

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
      <SelectRolePatientModal
        visible={roleInformation.patient}
        setRoleInformation={setRoleInformation}
      />
      <SelectRoleDoctorModal
        visible={roleInformation.doctor}
        setRoleInformation={setRoleInformation}
      />
      <SafeAreaView
        style={{
          width: (90 / 100) * width,
          alignSelf: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            marginTop: (20 / 100) * height,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 44,
              color: "#fff",
              width: (80 / 100) * width,
            }}
          >
            Please select your role to get started.
          </Text>
          <Text
            style={{
              fontFamily: "CenturyGothicRegular",
              fontSize: 12,
              color: "#ffffffe6",
              width: (80 / 100) * width,
            }}
          >
            Navigate Pain, Find answers: Your Body, Your 3D health companion.
          </Text>
        </View>
        <View
          style={{
            marginBottom: 20,
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => onPressRole("patient")}
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
              I'm a Patient
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressRole("doctor")}
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
              I'm a Doctor
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
