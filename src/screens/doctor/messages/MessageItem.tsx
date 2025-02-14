import { View, Text, ScrollView, useWindowDimensions, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { DefaultTheme, RouteProp, useRoute } from "@react-navigation/native";
import PatientMessages from "./PatientMessages";
import DoctorMessages from "./DoctorMessages";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import { sendMessages, setMessageInput, viewPatientMessages } from "../../../store/doctor/messageSlice";

export default function MessageItem() {
  const { width, height } = useWindowDimensions();
  const { params } = useRoute<RouteProp<{ Params: { patientId: string } }, "Params">>();
  const dispatch = useAppDispatch();
  const selectViewPatientMessage = useAppSelector((state) => state.doctorMessage.viewPatientMessages);
  const selectMessageInput = useAppSelector((state) => state.doctorMessage.messageInput);
  const selectSendMessage = useAppSelector((state) => state.doctorMessage.sendMessages);
  const onSubmitMessage = async () => {
    try {
      await dispatch(sendMessages({ patientId: params.patientId, message: selectMessageInput }));
    } catch (err) {}
  };
  useEffect(() => {
    (async () => dispatch(viewPatientMessages({ patientId: params.patientId })))();
  }, [selectSendMessage]);
  return (
    <View>
      <SafeAreaView
        style={{
          //   width: (90 / 100) * width,
          alignSelf: "center",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ height: (75 / 100) * height, flex: 1 }}>
          <View
            style={{
              flex: 1,
              width: (90 / 100) * width,
              alignSelf: "center",
            }}
          >
            {selectViewPatientMessage.status === "ok" &&
              selectViewPatientMessage.response.map((e, index) => {
                if (e.role === "DOCTOR") {
                  return <DoctorMessages key={index} {...e} />;
                }
                if (e.role === "PATIENT") {
                  return <PatientMessages key={index} {...e} />;
                }
              })}
          </View>
        </ScrollView>
        <View
          style={{
            width: width,
            alignSelf: "center",
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              ...DefaultTheme.colors,
              width: (90 / 100) * width,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#0000000D",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 12,
              marginVertical: 20,
            }}
          >
            <TextInput
              placeholder="Write messages..."
              onChangeText={(text) => dispatch(setMessageInput(text))}
              style={{
                flex: 1,
                color: "#000",
                fontFamily: "KalekoBook",
                fontSize: 12,
              }}
              multiline
              scrollEnabled={false}
            />
            <TouchableOpacity onPress={onSubmitMessage}>
              <Feather
                name="send"
                size={24}
                color="#0374F8"
                style={{
                  marginHorizontal: 4,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
