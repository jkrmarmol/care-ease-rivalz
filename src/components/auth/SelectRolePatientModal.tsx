import {
  View,
  Text,
  Modal,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { setRole } from "../../store/auth/registerSlice";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

export default function SelectRolePatientModal({
  visible,
  setRoleInformation,
}: {
  visible: boolean;
  setRoleInformation: Dispatch<
    SetStateAction<{ patient: boolean; doctor: boolean }>
  >;
}) {
  const dispatch = useAppDispatch();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const onPressRoleContinue = () => {
    setRoleInformation((prev) => ({ ...prev, patient: false }));
    dispatch(setRole("patient"));
    return nav.navigate("Register");
  };
  const { width, height } = useWindowDimensions();
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
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
          <TouchableOpacity
            onPress={() =>
              setRoleInformation((prev) => ({ ...prev, patient: false }))
            }
            style={{ position: "absolute", right: 15, top: 20 }}
          >
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
            I'm a Patient
          </Text>
          <Text
            style={{
              fontFamily: "KalekoBook",
              fontSize: 14,
              marginVertical: 10,
              color: "#000000B3",
            }}
          >
            As a patient, you'll be able to:
          </Text>
          <View
            style={{
              marginLeft: 14,
            }}
          >
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 6,
                color: "#000000B3",
              }}
            >
              &#x2022; Book appointments with healthcare professionals.
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 6,
                color: "#000000B3",
              }}
            >
              &#x2022; Access and manage your medical records securely.
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 6,
                color: "#000000B3",
              }}
            >
              &#x2022; Receive personalized health tips and reminders.
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 6,
                color: "#000000B3",
              }}
            >
              &#x2022; Communicate directly with your doctors for follow-ups.
            </Text>
          </View>
          <TouchableOpacity
            onPress={onPressRoleContinue}
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
  );
}
