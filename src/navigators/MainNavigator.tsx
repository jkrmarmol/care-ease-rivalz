import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientNavigator from "./PatientNavigator";
import AuthNavigators from "./AuthNavigators";
import Account from "../screens/patient/settings/Account";
import ChangeInformation from "../screens/patient/settings/ChangeInformation";
import ChangePassword from "../screens/patient/settings/ChangePassword";
import Appointment from "../screens/patient/appointment/Appointment";
import ChooseDoctor from "../screens/patient/appointment/ChooseDoctor";
import AppointmentDetails from "../screens/patient/appointment/AppointmentDetails";
import MessageItem from "../screens/patient/messages/MessageItem";
import DoctorProfile from "../screens/patient/appointment/DoctorProfile";
import DoctorNavigator from "./DoctorNavigator";
import { default as DoctorMessageItem } from "../screens/doctor/messages/MessageItem";
import { default as DoctorAccount } from "../screens/doctor/settings/Account";
import { default as DoctorChangeInformation } from "../screens/doctor/settings/ChangeInformation";
import { default as DoctorChangePassword } from "../screens/doctor/settings/ChangePassword";
import Verification from "../screens/auth/verification/Verification";
import CaptureIDCamera from "../screens/auth/verification/CaptureIDCamera";
import SelfieCamera from "../screens/auth/verification/SelfieCamera";
import { useAppDispatch } from "../hooks/useTypedSelector";
import { isAuthenticated } from "../store/auth/loginSlice";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { default as PatientModelResponse } from "../screens/patient/humanModel/ModelResponse";
import "@react-native-firebase/database";
import "@react-native-firebase/functions";
import "@react-native-firebase/auth";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const dispatch = useAppDispatch();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(isAuthenticated());
      if (payload.message === "Authenticated") {
        if (payload.user.role === "PATIENT") {
          return nav.navigate("PatientNavigator");
        }
        if (payload.user.role === "DOCTOR") {
          // console.log(payload);
          if (payload.verification.status === "VERIFIED" && payload.verification.verified) {
            return nav.navigate("DoctorNavigator");
          }
          if (payload.verification.status === "REJECTED" && !payload.verification.verified) {
            return nav.navigate("Verification");
          }
          if (payload.verification.status === "PENDING" && !payload.verification.verified) {
            // return nav.navigate("DoctorNavigator");
          }
          return nav.navigate("Verification");
        }
      }
    })();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={AuthNavigators} name="AuthNavigators" />

      {/* Start Verification Screen  */}
      <Stack.Screen
        component={Verification}
        name="Verification"
        options={{
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        component={CaptureIDCamera}
        name="CaptureIDCamera"
        options={{
          animation: "simple_push",
        }}
      />

      <Stack.Screen
        component={SelfieCamera}
        name="SelfieCamera"
        options={{
          animation: "simple_push",
        }}
      />
      {/* End Verification Screen  */}

      {/* Start Patient Stack Screen  */}
      <Stack.Screen
        component={PatientNavigator}
        name="PatientNavigator"
        options={{
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        component={Account}
        name="PatientAccount"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        component={ChangeInformation}
        name="PatientChangeInformation"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        component={ChangePassword}
        name="PatientChangePassword"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        component={Appointment}
        name="PatientAppointment"
        options={{
          headerShown: true,
          headerTitle: "Appointment",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "KalekoBold",
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        component={ChooseDoctor}
        name="PatientChooseDoctor"
        options={{
          headerShown: true,
          headerTitle: "Appointment",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "KalekoBold",
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        component={DoctorProfile}
        name="PatientDoctorProfile"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "KalekoBold",
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        component={AppointmentDetails}
        name="PatientAppointmentDetails"
        options={{
          headerShown: true,
          headerTitle: "Appointment",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "KalekoBold",
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        component={MessageItem}
        name="PatientMessageItem"
        options={{
          headerShown: true,
          headerTitle: "Doctors",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "KalekoBold",
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        component={PatientModelResponse}
        name="PatientModelResponse"
        options={{
          headerShown: true,
          headerTitle: "Model Response",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "KalekoBold",
            fontSize: 16,
          },
        }}
      />
      {/* End Patient Stack Screen  */}
      {/* Start Doctor Stack Screen  */}
      <Stack.Screen
        component={DoctorNavigator}
        name="DoctorNavigator"
        options={{
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        component={DoctorMessageItem}
        name="DoctorMessageItem"
        options={{
          headerShown: true,
          headerTitle: "Doctors",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "KalekoBold",
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        component={DoctorAccount}
        name="DoctorAccount"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        component={DoctorChangeInformation}
        name="DoctorChangeInformation"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        component={DoctorChangePassword}
        name="DoctorChangePassword"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_right",
        }}
      />
      {/* End Doctor Stack Screen  */}
    </Stack.Navigator>
  );
}
