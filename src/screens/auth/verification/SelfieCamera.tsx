import { View, Text, TouchableOpacity, useWindowDimensions, Modal } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch } from "../../../hooks/useTypedSelector";
import { setSelfie } from "../../../store/auth/verificationSlice";

export default function SelfieCamera() {
  const { width, height } = useWindowDimensions();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  let camera = useRef<Camera>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <Modal visible transparent statusBarTranslucent animationType="fade">
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
              Requesting camera permission...
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 10,
                color: "#000000B3",
              }}
            >
              Hey there! To take full advantage of our app's features, we need permission to access your camera. This
              allows you to capture and share amazing moments. Please grant camera permission in your device settings.
              Thanks for enhancing your experience with us!
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
    );
  }

  if (hasPermission === false) {
    return (
      <Modal visible transparent statusBarTranslucent animationType="fade">
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
              Requesting camera failed!
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 14,
                marginVertical: 10,
                color: "#000000B3",
              }}
            >
              Hey there! To take full advantage of our app's features, we need permission to access your camera. This
              allows you to capture and share amazing moments. Please grant camera permission in your device settings.
              Thanks for enhancing your experience with us!
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
    );
  }
  const takePicture = async () => {
    if (camera.current) {
      const data = await camera.current.takePictureAsync();
      if (data.uri) {
        camera.current.pausePreview();
        dispatch(setSelfie(data.uri));
        return nav.goBack();
      }
    }
  };
  return (
    <Camera
      type={CameraType.front}
      ref={camera}
      autoFocus
      ratio="16:9"
      style={{
        width: "100%",
        overflow: "hidden",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={takePicture}
        style={{
          width: (90 / 100) * width,
          borderRadius: 8,
          backgroundColor: "#0095FF",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "KalekoBold",

            textAlign: "center",
            paddingVertical: 12,
          }}
        >
          Capture
        </Text>
      </TouchableOpacity>
    </Camera>
  );
}
