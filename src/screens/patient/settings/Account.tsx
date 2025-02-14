import React, { useEffect } from "react";
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { Feather, MaterialIcons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, DefaultTheme, useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { logout } from "../../../store/auth/loginSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import { getAccountDetails } from "../../../store/patient/settingsSlice";

export default function Account() {
  const { width, height } = useWindowDimensions();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const selectGetAccountDetails = useAppSelector((state) => state.patientSettings.getAccountDetails);
  const onPressLogout = () => {
    dispatch(logout());
    return nav.navigate("AuthNavigators");
  };
  useFocusEffect(() => {
    setTimeout(() => {
      NavigationBar.setBackgroundColorAsync("#fff");
    }, 0);
    return () => {
      NavigationBar.setBackgroundColorAsync("#fff");
    };
  });

  useEffect(() => {
    (async () => {
      dispatch(getAccountDetails());
    })();
  }, []);
  return (
    <View
      style={{
        ...DefaultTheme.colors,
        backgroundColor: "transparent",
        flex: 1,
      }}
    >
      <View
        style={{
          position: "relative",
        }}
      >
        <Image
          source={{
            uri: "https://as1.ftcdn.net/v2/jpg/05/60/44/42/1000_F_560444275_mug1Oo8Zkm487nc8WufZDvagrHtYJCuS.jpg",
          }}
          style={{
            height: (30 / 100) * height,
            resizeMode: "cover",
            width,
          }}
        />
        <Image
          source={{
            uri: "https://png.pngtree.com/png-clipart/20220909/original/pngtree-cartoon-man-avatar-vector-ilustration-png-image_8515463.png",
          }}
          style={{
            resizeMode: "contain",
            height: 100,
            width: 100,
            borderRadius: 100,
            borderWidth: 6,
            borderColor: "#fff",
            position: "absolute",
            bottom: -50,
            left: (5 / 100) * width,
            backgroundColor: "#fff",
          }}
        />
      </View>
      <SafeAreaView
        style={{
          width: (90 / 100) * width,
          alignSelf: "center",
          marginTop: 10,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "KalekoBold",
            fontSize: 20,
            marginTop: 6,
          }}
        >
          {selectGetAccountDetails.status === "ok" &&
            `${selectGetAccountDetails.response.firstName} ${selectGetAccountDetails.response.lastName}`}
        </Text>
        <Text
          style={{
            fontFamily: "KalekoBold",
            opacity: 0.5,
          }}
        >
          {selectGetAccountDetails.status === "ok" && `${selectGetAccountDetails.response.user.role}`}
        </Text>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 12,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "KalekoBold",
                fontSize: 12,
                color: "#00000066",
                marginBottom: 20,
              }}
            >
              SETTINGS
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => nav.navigate("PatientChangeInformation")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 6,
                  marginVertical: 4,
                  paddingHorizontal: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Feather name="user" size={24} color="black" />
                  <Text
                    style={{
                      fontFamily: "KalekoBold",
                      marginLeft: 10,
                      fontSize: 12,
                    }}
                  >
                    Change Information
                  </Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => nav.navigate("PatientChangePassword")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 6,
                  marginVertical: 4,
                  paddingHorizontal: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Feather name="lock" size={24} color="black" />
                  <Text
                    style={{
                      fontFamily: "KalekoBold",
                      marginLeft: 10,
                      fontSize: 12,
                    }}
                  >
                    Change password
                  </Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    "https://www.privacypolicyonline.com/live.php?token=paFu6za0fKM1K8TMHLXwVX8ocU4gbmlE"
                  )
                }
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 6,
                  marginVertical: 4,
                  paddingHorizontal: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons name="shield-check-outline" size={24} color="black" />
                  <Text
                    style={{
                      fontFamily: "KalekoBold",
                      marginLeft: 10,
                      fontSize: 12,
                    }}
                  >
                    Privacy Policy
                  </Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    "https://www.termsandconditionsgenerator.com/live.php?token=2mUusg4yDyXdQyNCOuNVH6t3WN8BVtYG"
                  )
                }
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 6,
                  marginVertical: 4,
                  paddingHorizontal: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="document-text-outline" size={24} color="black" />
                  <Text
                    style={{
                      fontFamily: "KalekoBold",
                      marginLeft: 10,
                      fontSize: 12,
                    }}
                  >
                    Terms & Conditions
                  </Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={onPressLogout}
          style={{
            backgroundColor: "#0000000D",
            paddingVertical: 14,
            borderRadius: 12,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "CenturyGothicBold",
              textAlign: "center",
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
