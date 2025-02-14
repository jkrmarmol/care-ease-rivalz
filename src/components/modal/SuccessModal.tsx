import {
  View,
  Text,
  Modal,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { setRole } from "../../store/auth/registerSlice";

export default function SuccessModal({
  visible,
  title,
  description,
  icon,
}: {
  visible: boolean;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const nav = useNavigation<NavigationProp<ParamListBase>>();

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
            // onPress={() => setModal((prev) => ({ ...prev, doctor: false }))}
            style={{ position: "absolute", right: 15, top: 20 }}
          >
            <AntDesign name="close" size={24} color="#00000080" />
          </TouchableOpacity>
          {icon}
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 20,
              marginVertical: 6,
              marginTop: 30,
            }}
          >
            I'm a Doctor
          </Text>
          <Text
            style={{
              fontFamily: "KalekoBook",
              fontSize: 14,
              marginVertical: 10,
              color: "#000000B3",
            }}
          >
            As a doctor, you'll have access to:
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
              &#x2022; A dashboard to manage appointments and patient queries.
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 6,
                color: "#000000B3",
              }}
            >
              &#x2022; Tools to review and update patient health records.
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 6,
                color: "#000000B3",
              }}
            >
              &#x2022; Features to connect with and advise your patients
              remotely.
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 6,
                color: "#000000B3",
              }}
            >
              &#x2022; Analytics to track patient health trends and treatment
              outcomes.
            </Text>
          </View>
          <TouchableOpacity
            // onPress={onPressModal}
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
