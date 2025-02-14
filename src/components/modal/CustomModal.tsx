import {
  View,
  Text,
  Modal,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ICustomModalType } from "../../typings/interface";
import { TCustomModalType } from "../../typings/types";

export default function CustomModal({
  icon,
  title = "",
  description = "",
  visible,
  setModal,
  modalType,
  showButton = true,
  showExitButton = true,
}: {
  icon: ReactNode;
  title?: string;
  description?: string;
  visible: boolean | undefined;
  setModal: Dispatch<SetStateAction<ICustomModalType>>;
  modalType: TCustomModalType;
  showButton?: boolean;
  showExitButton?: boolean;
}) {
  const { width } = useWindowDimensions();
  return (
    <Modal
      visible={visible}
      statusBarTranslucent
      transparent
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
          {showExitButton && (
            <TouchableOpacity
              onPress={() =>
                setModal((prev) => ({ ...prev, [modalType]: false }))
              }
              style={{
                position: "absolute",
                right: 15,
                top: 20,
              }}
            >
              <AntDesign name="close" size={24} color="#00000080" />
            </TouchableOpacity>
          )}

          <View
            style={{
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            {icon}
          </View>
          {title && (
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 20,
                marginVertical: 6,
                marginTop: 30,
                textAlign: "center",
              }}
            >
              {title}
            </Text>
          )}

          {description && (
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 10,
                color: "#000000B3",
                textAlign: "justify",
              }}
            >
              {description}
            </Text>
          )}

          {showButton && (
            <TouchableOpacity
              onPress={() =>
                setModal((prev) => ({ ...prev, [modalType]: false }))
              }
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
                Got it
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
