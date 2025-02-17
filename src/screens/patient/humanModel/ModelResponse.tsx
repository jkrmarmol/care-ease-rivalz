import { View, ScrollView, useWindowDimensions, Text } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModelResponse() {
  const { params } = useRoute<RouteProp<{ Params: { data: string } }, "Params">>();
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <SafeAreaView
        style={{
          width: (90 / 100) * width,
          alignSelf: "center",
        }}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ height: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontFamily: "KalekoBook",
              lineHeight: 24,
            }}
          >
            {params.data}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
