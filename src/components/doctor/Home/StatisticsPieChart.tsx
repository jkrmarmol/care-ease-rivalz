import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";

export default function StatisticsPieChart() {
  const pieData = [
    { value: 54, color: "#26FF70" },
    { value: 40, color: "#FF4545" },
  ];
  const renderLegend = (text: any, color: any) => {
    return (
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || "white",
          }}
        />
        <Text
          style={{
            color: "#000",
            fontSize: 12,
            fontFamily: "KalekoBook",
          }}
        >
          {text || ""}
        </Text>
      </View>
    );
  };
  const { width } = useWindowDimensions();
  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          width: (90 / 100) * width,
          alignSelf: "center",
          padding: 20,
          borderRadius: 12,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "KalekoBold",
          }}
        >
          Patient Statistics
        </Text>
        <View
          style={{
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <PieChart
            data={pieData}
            showText
            textColor="black"
            radius={100}
            textSize={12}
            focusOnPress
            showValuesAsLabels
            showTextBackground
            textBackgroundRadius={15}
            fontWeight="bold"
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            {renderLegend("Accepted", "#26FF70")}
            {renderLegend("Rejected", "#FF4545")}
          </View>
        </View>
      </View>
    </>
  );
}
