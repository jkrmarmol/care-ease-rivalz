import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { IViewMessageList } from "../../../typings/interface";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import moment from "moment";

export default function MessageList(data: IViewMessageList) {
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <TouchableOpacity
      onPress={() => nav.navigate("PatientMessageItem", { doctorId: data.doctorId })}
      style={{
        flexDirection: "row",
        alignItems: "center",

        padding: 8,
        marginVertical: 8,
      }}
    >
      <Image
        source={{
          uri: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
        }}
        style={{
          height: 55,
          width: 55,
          resizeMode: "contain",
        }}
      />
      <View
        style={{
          flex: 1,
          marginLeft: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "KalekoBold",
              fontSize: 14,
            }}
          >
            {`${data.doctor?.userInformation.lastName}`}
          </Text>
          <Text
            style={{
              fontFamily: "KalekoBold",
              opacity: 0.5,
              fontSize: 10,
            }}
          >
            {moment(data.createdAt).calendar()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "KalekoBook",
              opacity: 0.5,
              fontSize: 10,
            }}
          >
            {data.message.slice(0, 100) + "..."}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
