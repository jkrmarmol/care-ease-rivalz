import {
  View,
  Text,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePassword() {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <SafeAreaView
        style={{
          width: (90 / 100) * width,
          alignSelf: "center",
          flex: 1,
          marginTop: (10 / 100) * height,
        }}
      >
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
            Change password
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: "KalekoBold",
              color: "#00000066",
            }}
          >
            Changing your password often keeps your account safe from hackers.
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
              Current Password
            </Text>
            <TextInput
              secureTextEntry
              placeholder="Please type your current password"
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
              New password
            </Text>
            <TextInput
              secureTextEntry
              placeholder="Please type your new password"
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
              Confirm new password
            </Text>
            <TextInput
              secureTextEntry
              placeholder="Please type confirm new password"
              placeholderTextColor="#00000066"
              style={{
                fontFamily: "KalekoBold",
                fontSize: 12,
              }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#0374F8",
              paddingVertical: 14,
              borderRadius: 12,
              marginBottom: 10,
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
