import {
  View,
  Text,
  Image,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarStyle, setStatusBarTranslucent, setStatusBarBackgroundColor } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { cleanUpLogin, setEmail, setPassword } from "../../store/auth/loginSlice";
import { login } from "../../store/auth/loginSlice";
import SuccessSVG from "../../components/reactSVG/SuccessSVG";
import CustomModal from "../../components/modal/CustomModal";
import hasLocationInError from "../../utils/hasLocationInError";
import { ICustomModalType } from "../../typings/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp } from "@react-native-firebase/app";

export default function Login() {
  const { width, height } = useWindowDimensions();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const selectLoginAuth = useAppSelector((state) => state.loginAuth);
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });
  const [modal, setModal] = useState<ICustomModalType>({
    loading: false,
    missingInfo: false,
    success: false,
    error: false,
    emailNotFound: false,
    incorrectPassword: false,
    accountPending: false,
  });
  const onPressLogin = async () => {
    try {
      setModal((prev) => ({ ...prev, loading: true }));
      getApp()
        .auth()
        .signInWithEmailAndPassword(selectLoginAuth.email, selectLoginAuth.password)
        .then((userCredential) => {
          if (userCredential) {
            setModal((prev) => ({ ...prev, loading: false }));
            setModal((prev) => ({ ...prev, success: true }));
            setTimeout(() => {
              setModal((prev) => ({ ...prev, success: false }));
              return nav.navigate("PatientNavigator");
            }, 3000);
          }
        })
        .catch((error) => {
          setModal((prev) => ({ ...prev, loading: false }));
          setModal((prev) => ({ ...prev, error: true }));
          setTimeout(() => {
            setModal((prev) => ({ ...prev, error: false }));
          }, 3000);
        });
      // setTimeout(async () => {
      //   const { payload } = await dispatch(
      //     login({
      //       email: selectLoginAuth.email,
      //       password: selectLoginAuth.password,
      //     })
      //   );
      //   if (payload) {
      //     if (payload.message === "Login successfully") {
      //       setModal((prev) => ({ ...prev, loading: false }));
      //       dispatch(cleanUpLogin());
      //       if (payload.data.role === "PATIENT") {
      //         if (payload.data.status === "PENDING") {
      //           setModal((prev) => ({ ...prev, accountPending: true }));
      //           setTimeout(async () => {
      //             setModal((prev) => ({ ...prev, accountPending: false }));
      //             await AsyncStorage.removeItem("token");
      //             return nav.navigate("Login");
      //           }, 3000);
      //         }
      //         setModal((prev) => ({ ...prev, success: true }));
      //         setTimeout(() => {
      //           setModal((prev) => ({ ...prev, success: false }));
      //           return nav.navigate("PatientNavigator");
      //         }, 3000);
      //       }
      //       if (payload.data.role === "DOCTOR") {
      //         if (payload.data.status === "PENDING" && !payload.data.verified) {
      //           setModal((prev) => ({ ...prev, accountPending: true }));
      //           setTimeout(async () => {
      //             setModal((prev) => ({ ...prev, accountPending: false }));
      //             await AsyncStorage.removeItem("token");
      //             return nav.navigate("Login");
      //           }, 3000);
      //         }
      //         if (!payload.data.verified) {
      //           return nav.navigate("Verification");
      //         }
      //         setModal((prev) => ({ ...prev, success: true }));
      //         setTimeout(() => {
      //           setModal((prev) => ({ ...prev, success: false }));
      //           return nav.navigate("DoctorNavigator");
      //         });
      //       }
      //     }
      //     if (payload.message === "Email not found. Please check and try again.") {
      //       setModal((prev) => ({ ...prev, loading: false }));
      //       setModal((prev) => ({ ...prev, emailNotFound: true }));
      //     }
      //     if (payload.message === "Incorrect password. Please try again.") {
      //       setModal((prev) => ({ ...prev, loading: false }));
      //       setModal((prev) => ({ ...prev, incorrectPassword: true }));
      //     }
      //     if (hasLocationInError(payload)) {
      //       setModal((prev) => ({ ...prev, loading: false }));
      //       setModal((prev) => ({ ...prev, missingInfo: true }));
      //     }
      //     setModal((prev) => ({ ...prev, loading: false }));
      //   }
      // }, 3000);
    } catch (err) {
      console.error(err);
    }
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
      setStatusBarBackgroundColor("transparent", true);
    };
  });
  return (
    <ScrollView
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
        description="Please provide both email and password. They are required for account access."
        setModal={setModal}
        modalType="missingInfo"
      />
      <CustomModal
        visible={modal.error}
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
        title="Something went wrong"
        description="Please provide both email and password. They are required for account access."
        setModal={setModal}
        modalType="error"
      />
      <CustomModal
        visible={modal.emailNotFound}
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
        title="Email not found"
        description="The provided email does not match any registered account. Please check and try again."
        setModal={setModal}
        modalType="emailNotFound"
      />
      <CustomModal
        visible={modal.incorrectPassword}
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
        title="Incorrect password"
        description="The entered password is incorrect. Please double-check and try again for secure access."
        setModal={setModal}
        modalType="incorrectPassword"
      />
      <CustomModal
        visible={modal.accountPending}
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
        title="Account Verification Pending"
        description="We're still processing your account verification. Please allow some time. Thank you for your patience."
        setModal={setModal}
        modalType="missingInfo"
      />
      <CustomModal
        visible={modal.success}
        icon={<SuccessSVG size={120} color="#0374F8" />}
        title="You've successfully logged in🎉"
        description="Success! Explore your personalized experience with CareEase."
        setModal={setModal}
        modalType="success"
        showButton={false}
        showExitButton
      />
      <SafeAreaView
        style={{
          width: (90 / 100) * width,
          alignSelf: "center",
          marginTop: StatusBar.currentHeight,
          justifyContent: "space-between",
          flex: 1,
          height,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: (20 / 100) * height,
            }}
          >
            <Image
              source={require("../../assets/images/logo_gradient.png")}
              style={{
                resizeMode: "contain",
                width: 40,
                height: 40,
              }}
            />
            <Text
              style={{
                color: "#0374F8",
                fontSize: 30,
                fontFamily: "KalekoBold",
              }}
            >
              CareEase
            </Text>
          </View>
          <View
            style={{
              gap: 10,
              marginTop: (10 / 100) * height,
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
                focus.email && { borderWidth: 2, borderColor: "#0095FF" },
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
                placeholder="Please type your email"
                value={selectLoginAuth.email}
                onChangeText={(text) => dispatch(setEmail(text))}
                placeholderTextColor="#00000066"
                onFocus={() =>
                  setFocus((prev) => ({
                    ...prev,
                    password: false,
                    email: true,
                  }))
                }
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
                focus.password && { borderWidth: 2, borderColor: "#0095FF" },
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
                value={selectLoginAuth.password}
                onChangeText={(text) => dispatch(setPassword(text))}
                onFocus={() =>
                  setFocus((prev) => ({
                    ...prev,
                    password: true,
                    email: false,
                  }))
                }
                placeholder="Please type your password"
                placeholderTextColor="#00000066"
                secureTextEntry
                style={{
                  fontFamily: "KalekoBold",
                  fontSize: 12,
                }}
              />
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#0095FF",
                  fontFamily: "KalekoBold",
                  fontSize: 11,
                  textAlign: "center",
                  marginTop: 4,
                }}
              >
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // position: "absolute",
            // bottom: 0,
            // flex: 1,
            // marginTop: (30 / 100) * height,
            width: "100%",
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity
            // onPress={() => nav.navigate("Verification")}
            onPress={onPressLogin}
            style={{
              backgroundColor: "#0374F8",
              paddingVertical: 18,
              borderRadius: 12,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontFamily: "CenturyGothicBold",
              }}
            >
              Login
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
    </ScrollView>
  );
}
