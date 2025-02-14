import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ActionModal from "./ActionModal";
import { IDoctorViewAllAppointment } from "../../../typings/interface";
import moment from "moment";

export default function ItemList(data: IDoctorViewAllAppointment) {
  const [openAction, setOpenAction] = useState<boolean>(false);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#0000000D",
        padding: 10,
        alignItems: "center",
        marginVertical: 4,
        borderRadius: 6,
      }}
    >
      <Text
        style={{
          fontFamily: "KalekoBold",
          fontSize: 10,
        }}
      >
        Mr. {data.patient?.userInformation.lastName}
      </Text>
      <Text
        style={{
          fontFamily: "KalekoBold",
          fontSize: 10,
        }}
      >
        {moment(data.dateAppoint).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
      <TouchableOpacity
        onPress={() => setOpenAction(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#0000000D",
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 6,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "KalekoBold",
            fontSize: 10,
            color: "#00000099",
          }}
        >
          Actions
        </Text>
        <ActionModal visible={openAction} setOpenAction={setOpenAction} id={data.id} />
      </TouchableOpacity>
    </View>
  );
}
