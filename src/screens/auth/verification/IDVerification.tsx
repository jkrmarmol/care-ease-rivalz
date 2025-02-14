import { View, Text, TouchableOpacity, useWindowDimensions, Modal, Image, TextInput } from "react-native";
import React from "react";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import { setIdType } from "../../../store/auth/verificationSlice";

export default function IDVerification() {
  const { width } = useWindowDimensions();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const selectVerifyInfo = useAppSelector((state) => state.authVerification.verify);
  return (
    <>
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
            <Image
              source={require("../../../assets/images/3d-minimal-id-card-scanning-identity-verification-concept-hand-holding-a-smartphone-with-a-photo-mode-screen-3d-rendering-illustration.png")}
              style={{
                resizeMode: "contain",
                width: 200,
                height: 200,
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 20,
                marginVertical: 6,
                marginTop: 30,
              }}
            >
              ID Verification Instructions
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 14,
                marginVertical: 6,
                color: "#000000B3",
              }}
            >
              Capture the Front of Your ID
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 2,
                color: "#000000B3",
              }}
            >
              &#x2022; Position your ID within the on-screen frame..
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 2,
                color: "#000000B3",
              }}
            >
              &#x2022; Align the edges of your ID with the guidelines.
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 2,
                color: "#000000B3",
              }}
            >
              &#x2022; Steadily capture the front side of your ID by tapping the shutter button.
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 14,
                marginVertical: 10,
                color: "#000000B3",
              }}
            >
              Capture the Back of Your ID:
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 2,
                color: "#000000B3",
              }}
            >
              &#x2022; Flip your ID to the back.
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 2,
                color: "#000000B3",
              }}
            >
              &#x2022; Position it within the on-screen frame and align the edges.
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 2,
                color: "#000000B3",
              }}
            >
              &#x2022; Capture the back side by tapping the shutter button.
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
      <View
        style={{
          paddingVertical: 10,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "KalekoBold",
            fontSize: 22,
          }}
        >
          Verify ID
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
        <TouchableOpacity
          onPress={() => nav.navigate("CaptureIDCamera", { type: "frontId" })}
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
            Front ID
          </Text>
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 12,
              paddingVertical: 6,
              opacity: 0.4,
            }}
          >
            Click to open camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => nav.navigate("CaptureIDCamera", { type: "backId" })}
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
            Back ID
          </Text>
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 12,
              paddingVertical: 6,
              opacity: 0.4,
            }}
          >
            Click to open camera
          </Text>
        </TouchableOpacity>
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
            ID Type
          </Text>
          <TextInput
            defaultValue={selectVerifyInfo.idType}
            onChangeText={(text) => dispatch(setIdType(text))}
            placeholder="Please type your id type"
            placeholderTextColor="#00000066"
            style={{
              fontFamily: "KalekoBold",
              fontSize: 12,
            }}
          />
        </View>
      </View>
    </>
  );
}
