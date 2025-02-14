import { View, Text, useWindowDimensions, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DefaultTheme,
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import CustomModal from "../../../components/modal/CustomModal";
import SuccessSVG from "../../../components/reactSVG/SuccessSVG";
import DateTimePicker from "@react-native-community/datetimepicker";
import type { ICustomModalType } from "../../../typings/interface";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import { addAppointment, setDateAppoint, setSymptoms } from "../../../store/patient/appointmentSlice";
import moment from "moment";

export default function AppointmentDetails() {
  const { width } = useWindowDimensions();
  const { params } = useRoute<RouteProp<{ Params: { doctorId: string } }, "Params">>();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const selectAppointment = useAppSelector((state) => state.patientAppointment.appointment);
  const [modal, setModal] = useState<ICustomModalType>({
    success: false,
  });
  const [show, setShow] = useState(false);
  const showDatepicker = () => {
    setShow(true);
  };
  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      dispatch(setDateAppoint(selectedDate));
    }
  };

  const onPressSubmit = async () => {
    const { payload } = await dispatch(addAppointment(selectAppointment));
    if (payload) {
      if (
        payload.message ===
        "Congratulations! Your appointment has been successfully scheduled. We look forward to assisting you."
      ) {
        return nav.navigate("PatientNavigator");
      }
    }
    console.log(payload);
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CustomModal
        visible={modal.success}
        setModal={setModal}
        icon={<SuccessSVG size={80} color="#35D675" />}
        description="Your appointment request has been successfully submitted. Please wait for your doctor to review and approve your appointment. We will notify you once it has been confirmed. Thank you for your patience!"
        title="Appointment Submitted!"
        modalType={"success"}
      />
      <SafeAreaView
        style={{
          width: (90 / 100) * width,
          alignSelf: "center",
          flex: 1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 12,
            flex: 1,
          }}
        >
          <View
            style={{
              marginBottom: 20,
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                paddingHorizontal: 20,
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
              <Text
                style={{
                  fontFamily: "KalekoBold",
                  marginLeft: 10,
                }}
              >
                Dr. John Doe
              </Text>
            </View>
            <View
              style={{
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "KalekoBold",
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Select date & time you prefer
              </Text>
              <TouchableOpacity
                onPress={showDatepicker}
                style={[
                  {
                    backgroundColor: "#0000000D",
                    borderRadius: 14,
                    overflow: "hidden",
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                  },
                ]}
              >
                <TextInput
                  placeholder="Please select your prefer date"
                  defaultValue={
                    moment(selectAppointment.dateAppoint).format("YYYY-MM-DD") ===
                    moment(new Date()).format("YYY-MM-DD")
                      ? ""
                      : moment(selectAppointment.dateAppoint).format("YYYY-MM-DD")
                  }
                  editable={false}
                  placeholderTextColor="#00000066"
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                    color: "#000",
                  }}
                />
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={false}
                    onChange={onChange}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "KalekoBold",
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Explain your symptoms/pain?
              </Text>
              <TextInput
                multiline
                numberOfLines={5}
                placeholder="Write here"
                onChangeText={(text) => dispatch(setSymptoms(text))}
                placeholderTextColor={"#00000066"}
                style={{
                  backgroundColor: "#0000000D",
                  padding: 12,
                  fontFamily: "KalekoBold",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#000",
                  height: 90,
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            ...DefaultTheme.colors,
            paddingVertical: 10,
            backgroundColor: "transparent",
          }}
        >
          <TouchableOpacity
            onPress={onPressSubmit}
            style={{
              backgroundColor: "#0095FF",
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 14,
                textAlign: "center",
                color: "#fff",
                paddingVertical: 18,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
