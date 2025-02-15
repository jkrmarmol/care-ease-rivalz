import React from "react";
import "react-native-gesture-handler";
import MainNavigator from "./src/navigators/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./src/store/store";
import "@react-native-firebase/database";
import "@react-native-firebase/functions";
import "@react-native-firebase/auth";
import "@react-native-firebase/storage";

export default function App() {
  const [fontsLoaded] = useFonts({
    KalekoBold: require("./src/assets/fonts/kaleko-105/Kaleko105Bold.ttf"),
    KalekoLight: require("./src/assets/fonts/kaleko-105/Kaleko105Light.ttf"),
    KalekoThin: require("./src/assets/fonts/kaleko-105/Kaleko105Thin.ttf"),
    KalekoBook: require("./src/assets/fonts/kaleko-105/Kaleko105Book.ttf"),
    KalekoHeavy: require("./src/assets/fonts/kaleko-105/Kaleko105Heavy.ttf"),
    CenturyGothicRegular: require("./src/assets/fonts/century-gothic/CenturyGothicRegular.ttf"),
    CenturyGothicBold: require("./src/assets/fonts/century-gothic/CenturyGothicBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </NavigationContainer>
  );
}
