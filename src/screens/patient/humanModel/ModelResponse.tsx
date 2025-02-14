import { View, ScrollView, useWindowDimensions } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
// import Markdown from "react-native-markdown-display";
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
          {/* <Markdown
            style={{
              body: {
                fontFamily: "KalekoBook",
                lineHeight: 28,
              },
            }}
          >
            {params.data}
          </Markdown> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
