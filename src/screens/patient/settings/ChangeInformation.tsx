import React, { useEffect, useState } from "react";
import { View, Text, useWindowDimensions, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import LottieView from "lottie-react-native";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import {
  setFirstName,
  setMiddleName,
  setBirthDate,
  setLastName,
  cleanUpChangeName,
  getChangeName,
  updateChangeName,
} from "../../../store/patient/settingsSlice";
import CustomModal from "../../../components/modal/CustomModal";
import SuccessSVG from "../../../components/reactSVG/SuccessSVG";
import type { ICustomModalType } from "../../../typings/interface";

export default function ChangeInformation() {
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const selectFirstName = useAppSelector((state) => state.patientSettings.changeName.firstName);
  const selectMiddleName = useAppSelector((state) => state.patientSettings.changeName.middleName);
  const selectLastName = useAppSelector((state) => state.patientSettings.changeName.lastName);
  const selectBirthDate = useAppSelector((state) => state.patientSettings.changeName.birthDate);
  // const [submittable, setSubmittable] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      dispatch(setBirthDate(selectedDate));
    }
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const [modal, setModal] = useState<ICustomModalType>({
    loading: false,
    success: false,
    error: false,
  });

  // if (selectFirstName && selectMiddleName && selectLastName && selectBirthDate) {
  //   const checkCanSubmit =
  //     selectFirstName.length >= 1 &&
  //     selectMiddleName.length >= 1 &&
  //     selectLastName.length >= 1 &&
  //     moment(selectBirthDate).format("YYYY-MM-DD") <= moment(new Date()).format("YYYY-MM-DD");
  //   setSubmittable(checkCanSubmit);
  // }

  const onPressSaveChangeName = async () => {
    try {
      setModal((prev) => ({ ...prev, loading: true }));
      setTimeout(async () => {
        const { payload } = await dispatch(
          updateChangeName({
            firstName: selectFirstName,
            middleName: selectMiddleName,
            lastName: selectLastName,
            birthDate: selectBirthDate,
          })
        );
        if (payload) {
          if (payload.message === "Update successfully") {
            setModal((prev) => ({ ...prev, loading: false }));
            setModal((prev) => ({ ...prev, success: true }));
            setTimeout(() => {
              setModal((prev) => ({ ...prev, success: false }));
              return nav.goBack();
            }, 3000);
          }
          if (payload.error) {
            setModal((prev) => ({ ...prev, loading: false }));
            setModal((prev) => ({ ...prev, error: true }));
            setTimeout(() => {
              setModal((prev) => ({ ...prev, error: false }));
            }, 3000);
          }
        }
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getChangeName());
    })();

    return () => {
      dispatch(cleanUpChangeName());
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <CustomModal
        visible={modal.loading}
        icon={
          <LottieView
            autoPlay
            style={{
              width: 200,
            }}
            source={require("../../../assets/lottiefiles/68W5RbKLMa.json")}
          />
        }
        setModal={setModal}
        modalType="loading"
        showButton={false}
        showExitButton={false}
      />
      <CustomModal
        visible={modal.success}
        icon={<SuccessSVG size={120} color="#0374F8" />}
        title="Profile Updated Successfully"
        description="Your profile information has been successfully updated. Enjoy an enhanced experience with your new details."
        setModal={setModal}
        modalType="success"
        showButton={false}
        showExitButton={false}
      />
      <CustomModal
        visible={modal.error}
        icon={
          <LottieView
            autoPlay
            resizeMode="contain"
            style={{
              width: 120,
            }}
            source={require("../../../assets/lottiefiles/1708347727044.json")}
          />
        }
        title="Oops! Something Went Wrong"
        description="We're experiencing technical difficulties. Our team is on it. Please try again later. Apologies."
        setModal={setModal}
        modalType="error"
      />
      <SafeAreaView
        style={{
          width: (90 / 100) * width,
          alignSelf: "center",
          flex: 1,
          marginTop: (10 / 100) * height,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 22,
            }}
          >
            Change Information
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: "KalekoBold",
              color: "#00000066",
            }}
          >
            Enter your preferred name in this field. This could be your first name, full name, or a nickname that you're
            comfortable with.
          </Text>
          <View
            style={[
              {
                backgroundColor: "#0000000D",
                borderRadius: 14,
                overflow: "hidden",
                paddingVertical: 8,
                paddingHorizontal: 20,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                color: "#0095FF",
                fontFamily: "KalekoBold",
                fontSize: 10,
              }}
            >
              First name
            </Text>
            <TextInput
              onChangeText={(text) => dispatch(setFirstName(text))}
              defaultValue={selectFirstName}
              placeholder="Please type your first name"
              placeholderTextColor="#00000066"
              style={{
                fontFamily: "KalekoBold",
                fontSize: 12,
              }}
            />
          </View>
          <View
            style={[
              {
                backgroundColor: "#0000000D",
                borderRadius: 14,
                overflow: "hidden",
                paddingVertical: 8,
                paddingHorizontal: 20,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                color: "#0095FF",
                fontFamily: "KalekoBold",
                fontSize: 10,
              }}
            >
              Middle name
            </Text>
            <TextInput
              onChangeText={(text) => dispatch(setMiddleName(text))}
              defaultValue={selectMiddleName}
              placeholder="Please type your middle name"
              placeholderTextColor="#00000066"
              style={{
                fontFamily: "KalekoBold",
                fontSize: 12,
              }}
            />
          </View>
          <View
            style={[
              {
                backgroundColor: "#0000000D",
                borderRadius: 14,
                overflow: "hidden",
                paddingVertical: 8,
                paddingHorizontal: 20,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                color: "#0095FF",
                fontFamily: "KalekoBold",
                fontSize: 10,
              }}
            >
              Last name
            </Text>
            <TextInput
              onChangeText={(text) => dispatch(setLastName(text))}
              defaultValue={selectLastName}
              placeholder="Please type your last name"
              placeholderTextColor="#00000066"
              style={{
                fontFamily: "KalekoBold",
                fontSize: 12,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={showDatepicker}
            style={[
              {
                backgroundColor: "#0000000D",
                borderRadius: 14,
                overflow: "hidden",
                paddingVertical: 8,
                paddingHorizontal: 20,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                color: "#0095FF",
                fontFamily: "KalekoBold",
                fontSize: 10,
              }}
            >
              Birth Date
            </Text>
            <TextInput
              placeholder="Please select your birth date"
              defaultValue={
                moment(selectBirthDate).format("YYYY-MM-DD") <= moment(new Date()).format("YYYY-MM-DD")
                  ? moment(selectBirthDate).format("YYYY-MM-DD")
                  : undefined
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
                value={new Date(selectBirthDate)}
                mode={"date"}
                is24Hour={false}
                onChange={onChange}
                maximumDate={new Date(2016, 0, 0)}
                minimumDate={new Date(1950, 1, 1)}
              />
            )}
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            // disabled={!submittable}
            onPress={onPressSaveChangeName}
            style={{
              backgroundColor: "#0374F8",
              paddingVertical: 14,
              borderRadius: 12,
              marginBottom: 10,
              // opacity: !submittable ? 0.6 : 1,
            }}
          >
            <Text
              style={{
                fontFamily: "CenturyGothicBold",
                color: "#fff",
                textAlign: "center",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
