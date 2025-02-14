import { View, Text } from "react-native";
import React from "react";
import { Vector3 } from "@react-three/fiber/native";

export default function RedDot({ position }: { position: any }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
