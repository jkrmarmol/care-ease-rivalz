import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import type { IViewAllAppointment } from "../../../typings/interface";
import moment from "moment";

export default function AppointmentList(data: IViewAllAppointment) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 4,
      }}
    >
      <Text
        style={{
          fontFamily: "KalekoBold",
          fontSize: 10,
        }}
      >
        Dr. {`${data.doctor.userInformation.firstName} ${data.doctor.userInformation.lastName}`}
      </Text>
      <Text
        style={{
          fontFamily: "KalekoBold",
          fontSize: 10,
        }}
      >
        {moment(data.dateAppoint).format("YYYY-MM-DD")}
      </Text>
      <View
        style={{
          backgroundColor: `${
            data.status === "PENDING"
              ? "#FFA8001A"
              : data.status === "SUCCESS"
              ? "#00D2221A"
              : data.status === "CANCELLED"
              ? "#FF00001A"
              : data.status === "ACCEPTED"
              ? "#00D2221A"
              : ""
          }`,
          paddingVertical: 4,
          paddingHorizontal: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "KalekoBold",
            fontSize: 10,
            color: `${
              data.status === "PENDING"
                ? "#FFA800"
                : data.status === "SUCCESS"
                ? "#00D222"
                : data.status === "CANCELLED"
                ? "#FF0000"
                : data.status === "ACCEPTED"
                ? "#00D222"
                : ""
            }`,
          }}
        >
          {data.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
