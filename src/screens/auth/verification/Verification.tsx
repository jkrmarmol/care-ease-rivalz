// @ts-ignore
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { View, Text, TouchableOpacity, useWindowDimensions, Modal } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import InformationVerification from "./InformationVerification";
import IDVerification from "./IDVerification";
import FacialVerification from "./FacialVerification";
import { useAppSelector, useAppDispatch } from "../../../hooks/useTypedSelector";
import { AxiosError } from "axios";
import { accountVerification } from "../../../store/auth/verificationSlice";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Verification() {
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const selectVerifyInfo = useAppSelector((state) => state.authVerification.verify);
  const onSubmitVerification = async () => {
    try {
      const { payload } = await dispatch(accountVerification(selectVerifyInfo));
      await AsyncStorage.removeItem("token");
      return nav.navigate("Login");
    } catch (err) {
      if (err instanceof AxiosError) {
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <Modal visible={false} transparent statusBarTranslucent animationType="fade">
        <View
          style={{
            backgroundColor: "#00000080",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: (80 / 100) * width,
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 12,
            }}
          >
            <TouchableOpacity style={{ position: "absolute", right: 15, top: 20 }}>
              <AntDesign name="close" size={24} color="#00000080" />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 20,
                marginVertical: 6,
                marginTop: 30,
              }}
            >
              Account Not Verified!
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 10,
                color: "#000000B3",
              }}
            >
              Account verification required. To access the application, please verify your email. Check your inbox for a
              verification link. If you don't see it, kindly check your spam folder. Thank you for ensuring the security
              of your account.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#0374F8",
                paddingVertical: 14,
                borderRadius: 12,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "KalekoBold",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <SafeAreaView
        style={{
          width: (90 / 100) * width,
          flex: 1,
          alignSelf: "center",
        }}
      >
        <ProgressSteps
          completedProgressBarColor="#0095FF"
          activeStepIconColor="#0095FF"
          labelFontFamily="KalekoBold"
          labelFontSize={12}
          completedStepIconColor="#0095FF"
          activeStepIconBorderColor="#0095FF"
          activeLabelColor="#0095FF"
          activeLabelFontSize={14}
        >
          <ProgressStep
            label="Information"
            nextBtnTextStyle={{
              fontFamily: "KalekoBook",
              fontSize: 14,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <InformationVerification />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Verify ID"
            nextBtnTextStyle={{
              fontFamily: "KalekoBook",
              fontSize: 14,
            }}
            previousBtnTextStyle={{
              fontFamily: "KalekoBook",
              fontSize: 14,
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <IDVerification />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Selfie"
            nextBtnTextStyle={{
              fontFamily: "KalekoBook",
              fontSize: 14,
            }}
            previousBtnTextStyle={{
              fontFamily: "KalekoBook",
              fontSize: 14,
            }}
            onSubmit={onSubmitVerification}
          >
            <View style={{ alignItems: "center" }}>
              <FacialVerification />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </SafeAreaView>
    </View>
  );
}
function setModal(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}
