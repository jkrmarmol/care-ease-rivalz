import { Suspense } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import useControls from "r3f-native-orbitcontrols";
import Model from "./Model";
import Loader from "./Loader";
import React from "react";

export default function CanvasThree(props: JSX.IntrinsicElements["group"]) {
  const { width } = useWindowDimensions();
  const [OrbitControls, events] = useControls();

  return (
    <View style={styles.container} {...events}>
      <Canvas
        style={{
          flex: 1,
          width: width,
        }}
        camera={{ position: [0, 0, 10], fov: 35 }}
        // camera={{ position: [10, 0, 10], fov: 25 }} // right front side
        // camera={{ position: [-10, 0, 10], fov: 25 }} // left front side
        // camera={{ position: [-10, 0, -10], fov: 25 }} // right back side
        // camera={{ position: [10, 0, -10], fov: 25 }} // left back side
      >
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
