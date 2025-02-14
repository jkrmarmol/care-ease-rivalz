import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { IViewAllDoctor } from "../../../typings/interface";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../hooks/useTypedSelector";
import { cleanUpAppointment, setDoctorId } from "../../../store/patient/appointmentSlice";

export default function ChooseDoctorList(data: IViewAllDoctor) {
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setDoctorId(data.id));

    return () => {
      dispatch(cleanUpAppointment());
    };
  });
  return (
    <TouchableOpacity
      onPress={() => nav.navigate("PatientAppointmentDetails", { doctorId: data.id })}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
        marginVertical: 4,
      }}
    >
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
        }}
        style={{
          height: 50,
          width: 50,
          resizeMode: "contain",
          borderRadius: 100,
        }}
      />
      <View
        style={{
          flex: 1,
          padding: 6,
        }}
      >
        <TouchableOpacity
        // onPress={() => nav.navigate("PatientDoctorProfile")}
        >
          <Text style={{ fontFamily: "KalekoBold" }}>
            {`${data.userInformation.firstName} ${data.userInformation.lastName}`}{" "}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "KalekoBook",
            fontSize: 10,
            color: "#00000080",
          }}
        >
          {`${data.userInformation.specialties}`}
        </Text>
      </View>
      <TouchableOpacity
      //   onPress={() => nav.navigate("PatientMessageItem")}
      >
        <Feather name="send" size={20} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
