import { View, Text } from "react-native";
import React from "react";
import { useProgress } from "@react-three/drei/native";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Text
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {progress} % loaded
    </Text>
  );
}
