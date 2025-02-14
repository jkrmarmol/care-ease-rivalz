import { View, Text, ScrollView, useWindowDimensions, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { DefaultTheme, RouteProp, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import { viewDoctorMessages, setMessageInput, sendMessages } from "../../../store/patient/messageSlice";
import DoctorMessages from "./DoctorMessages";
import PatientMessages from "./PatientMessages";

export default function MessageItem() {
  const { width, height } = useWindowDimensions();
  const { params } = useRoute<RouteProp<{ Params: { doctorId: string } }, "Params">>();
  const dispatch = useAppDispatch();
  const selectViewDoctorMessages = useAppSelector((state) => state.patientMessage.viewDoctorMessages);
  const selectMessageInput = useAppSelector((state) => state.patientMessage.messageInput);
  const selectSendMessage = useAppSelector((state) => state.patientMessage.sendMessages);
  const onSubmitMessage = async () => {
    try {
      const { payload } = await dispatch(sendMessages({ doctorId: params.doctorId, message: selectMessageInput }));
      console.log(payload);
      dispatch(setMessageInput(""));
    } catch (err) {}
  };
  useEffect(() => {
    (async () => {
      await dispatch(viewDoctorMessages({ doctorId: params.doctorId }));
    })();
  }, [selectSendMessage]);
  return (
    <View>
      <SafeAreaView
        style={{
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
            {selectViewDoctorMessages.status === "ok" &&
              selectViewDoctorMessages.response.map((e, index) => {
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
