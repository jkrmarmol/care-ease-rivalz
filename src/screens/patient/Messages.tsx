import { View, Text, ScrollView, useWindowDimensions, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import MessageList from "../../components/patient/messages/MessageList";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { viewMessageList } from "../../store/patient/messageSlice";

export default function Messages() {
  const { width, height } = useWindowDimensions();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const selectViewMessageList = useAppSelector((state) => state.patientMessage.viewMessageList);

  useEffect(() => {
    (async () => {
      dispatch(viewMessageList());
    })();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
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
            Messages
          </Text>
          <View
            style={{
              marginTop: 10,
            }}
          >
            {selectViewMessageList.status === "ok" &&
              selectViewMessageList.response.map((e, index) => <MessageList key={index} {...e} />)}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
