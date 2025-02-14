import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart, PieChart } from "react-native-gifted-charts";
import GroupBarChart from "../../components/doctor/Home/GroupBarChart";
import StatisticsPieChart from "../../components/doctor/Home/StatisticsPieChart";

export default function Home() {
  const { width } = useWindowDimensions();

  return (
    <ScrollView>
      <SafeAreaView>
        <GroupBarChart />
        <StatisticsPieChart />
      </SafeAreaView>
    </ScrollView>
  );
}
