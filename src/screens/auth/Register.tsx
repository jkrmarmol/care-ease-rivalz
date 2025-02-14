import { View, Text, useWindowDimensions, ScrollView, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarStyle, setStatusBarTranslucent, setStatusBarBackgroundColor } from "expo-status-bar";
import { register, setEmail, setPassword } from "../../store/auth/registerSlice";
import CustomModal from "../../components/modal/CustomModal";
import type { ICustomModalType } from "../../typings/interface";
import SuccessSVG from "../../components/reactSVG/SuccessSVG";
import LottieView from "lottie-react-native";
import hasLocationInError from "../../utils/hasLocationInError";
import { emailRegex, passwordRegex } from "../../constant/regex";
import { getApp } from "@react-native-firebase/app";

export default function Register() {
  const { width, height } = useWindowDimensions();
  const selectRegisterRole = useAppSelector((state) => state.registerAuth.role);
  const selectRegisterEmail = useAppSelector((state) => state.registerAuth.email);
  const selectRegisterPassword = useAppSelector((state) => state.registerAuth.password);
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<ICustomModalType>({
    loading: false,
    success: false,
    missingInfo: false,
    emailAlreadyInUse: false,
    invalidPassword: false,
    invalidEmail: false,
  });

  const onPressRegister = async () => {
    if (!emailRegex.test(selectRegisterEmail)) {
      return setModal((prev) => ({ ...prev, invalidEmail: true }));
    }
    if (!passwordRegex.test(selectRegisterPassword)) {
      return setModal((prev) => ({ ...prev, invalidPassword: true }));
    }
    setModal((prev) => ({ ...prev, loading: true }));
    getApp()
      .auth()
      .createUserWithEmailAndPassword(selectRegisterEmail, selectRegisterPassword)
      .then((userCredential) => {
        if (userCredential) {
          setModal((prev) => ({ ...prev, loading: false }));
          setModal((prev) => ({ ...prev, success: true }));
          return nav.navigate("Login");
        }
        return setModal((prev) => ({ ...prev, emailAlreadyInUse: true }));
      })
      .catch((error) => console.log(error));
    // return setTimeout(async () => {
    //   const { payload } = await dispatch(
    //     register({
    //       role: selectRegisterRole,
    //       email: selectRegisterEmail,
    //       password: selectRegisterPassword,
    //     })
    //   );
    //   if (payload) {
    //     if (payload.message === "Registered successfully.") {
    //       setModal((prev) => ({ ...prev, loading: false }));
    //       setModal((prev) => ({ ...prev, success: true }));
    //       setTimeout(() => {
    //         setModal((prev) => ({ ...prev, success: false }));
    //         return nav.navigate("Login");
    //       }, 5000);
    //     }
    //     if (payload.error === "Email already in use. Please choose another.") {
    //       setModal((prev) => ({ ...prev, loading: false }));
    //       setModal((prev) => ({ ...prev, emailAlreadyInUse: true }));
    //     }
    //     if (hasLocationInError(payload)) {
    //       setModal((prev) => ({ ...prev, loading: false }));
    //       setModal((prev) => ({ ...prev, missingInfo: true }));
    //     }
    //   }
    // }, 3000);
  };

  useFocusEffect(() => {
    setTimeout(() => {
      NavigationBar.setBackgroundColorAsync("#fff");
      setStatusBarStyle("dark");
      setStatusBarBackgroundColor("#fff", true);
      setStatusBarTranslucent(true);
    }, 0);
    return () => {
      NavigationBar.setBackgroundColorAsync("#00000000");
    };
  });

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <CustomModal
        visible={modal.loading}
        icon={
          <LottieView
            autoPlay
            style={{
              width: 200,
              height: 200,
            }}
            source={require("../../assets/lottiefiles/68W5RbKLMa.json")}
          />
        }
        setModal={setModal}
        modalType="loading"
        showButton={false}
        showExitButton={false}
      />
      <CustomModal
        visible={modal.invalidEmail}
        icon={
          <LottieView
            autoPlay
            resizeMode="contain"
            style={{
              width: 120,
              height: 120,
            }}
            source={require("../../assets/lottiefiles/1708347727044.json")}
          />
        }
        title="Invalid Email Format"
        description="The entered email is not in a valid format. Please use a valid email address."
        setModal={setModal}
        modalType="invalidEmail"
      />
      <CustomModal
        visible={modal.invalidPassword}
        icon={
          <LottieView
            autoPlay
            resizeMode="contain"
            style={{
              width: 120,
              height: 120,
            }}
            source={require("../../assets/lottiefiles/1708347727044.json")}
          />
        }
        title="Invalid Password Format"
        description="Password must meet security requirements. Please ensure it has the required criteria. Ensure your password is 8-16 characters, includes uppercase, lowercase, number, and special character (no spaces)."
        setModal={setModal}
        modalType="invalidPassword"
      />
      <CustomModal
        visible={modal.success}
        icon={<SuccessSVG size={120} color="#0374F8" />}
        title="You've successfully registered!🎉"
        description="Login your account! and Explore your personalized experience with CareEase."
        setModal={setModal}
        modalType="success"
      />
      <CustomModal
        visible={modal.missingInfo}
        icon={
          <LottieView
            autoPlay
            resizeMode="contain"
            style={{
              width: 120,
              height: 120,
            }}
            source={require("../../assets/lottiefiles/1708347727044.json")}
          />
        }
        title="Missing Information"
        description="Please provide both email and password."
        setModal={setModal}
        modalType="missingInfo"
      />
      <CustomModal
        visible={modal.emailAlreadyInUse}
        icon={
          <LottieView
            autoPlay
            resizeMode="contain"
            style={{
              width: 120,
              height: 120,
            }}
            source={require("../../assets/lottiefiles/1708347727044.json")}
          />
        }
        title="Email Already Taken"
        description="The provided email is already registered. Please use a different email for your account."
        setModal={setModal}
        modalType="emailAlreadyInUse"
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
            flex: 1,
          }}
        >
          <View
            style={{
              marginTop: (10 / 100) * height,
            }}
          >
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 44,
              }}
            >
              Register an{" "}
              <Text
                style={{
                  color: "#0095FF",
                }}
              >
                account
              </Text>
            </Text>
          </View>
          <View
            style={{
              gap: 10,
              marginTop: (8 / 100) * height,
            }}
          >
            <View
              style={[
                {
                  backgroundColor: "#0000000D",
                  borderRadius: 14,
                  overflow: "hidden",
                  paddingVertical: 8,
                  paddingHorizontal: 20,
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
                Email
              </Text>
              <TextInput
                onChangeText={(text) => dispatch(setEmail(text))}
                placeholder="Please type your email"
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
                Password
              </Text>
              <TextInput
                onChangeText={(text) => dispatch(setPassword(text))}
                placeholder="Please set your password"
                secureTextEntry
                placeholderTextColor="#00000066"
                style={{
                  fontFamily: "KalekoBold",
                  fontSize: 12,
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            onPress={onPressRegister}
            style={{
              backgroundColor: "#0374F8",
              paddingVertical: 18,
              borderRadius: 12,
              marginVertical: 10,
              // marginTop: (20 / 100) * height,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontFamily: "CenturyGothicBold",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 9,
              textAlign: "center",
              width: (80 / 100) * width,
              alignSelf: "center",
              marginBottom: 10,
              opacity: 0.7,
              color: "#000000B3",
            }}
          >
            CareEase by Kuma Technologes, Your simple, smart health management app.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
