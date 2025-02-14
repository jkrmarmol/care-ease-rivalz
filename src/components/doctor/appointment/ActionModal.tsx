import { View, Text, Modal, useWindowDimensions, TouchableOpacity, NativeSyntheticEvent } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch } from "../../../hooks/useTypedSelector";
import { actionAppointment } from "../../../store/doctor/appointmentSlice";

export default function ActionModal({
  visible,
  setOpenAction,
  id,
}: {
  visible: boolean;
  setOpenAction: Dispatch<SetStateAction<boolean>>;
  id: string;
}) {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const [pressIn, setPressIn] = useState({
    accept: false,
    reject: false,
  });

  const onPressAction = async (action: "accept" | "reject") => {
    try {
      const { payload } = await dispatch(actionAppointment({ id, action }));
      if (payload) {
        if (payload.message === "Appointment accepted.") {
          setOpenAction(false);
        }
      }
    } catch (err) {}
  };
  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade">
      <View
        style={{
          backgroundColor: "#00000099",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            width: (90 / 100) * width,
            borderRadius: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => setOpenAction(false)}
            style={{
              alignSelf: "flex-end",
            }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressAction("accept")}
            onPressIn={() => setPressIn((prev) => ({ ...prev, accept: true }))}
            onPressOut={() => setPressIn((prev) => ({ ...prev, accept: false }))}
            activeOpacity={1}
            style={[
              {
                padding: 10,
                borderRadius: 6,
                marginVertical: 4,
              },
              pressIn.accept && { backgroundColor: "#0374F81A" },
            ]}
          >
            <Text
              style={[
                {
                  fontFamily: "KalekoBold",
                  color: "#00000099",
                },
                pressIn.accept && { color: "#0374F8" },
              ]}
            >
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressAction("reject")}
            onPressIn={() => setPressIn((prev) => ({ ...prev, reject: true }))}
            onPressOut={() => setPressIn((prev) => ({ ...prev, reject: false }))}
            activeOpacity={1}
            style={[
              {
                padding: 10,
                borderRadius: 6,
                marginVertical: 4,
              },
              pressIn.reject && { backgroundColor: "#0374F81A" },
            ]}
          >
            <Text
              style={[
                {
                  fontFamily: "KalekoBold",
                  color: "#00000099",
                },
                pressIn.reject && { color: "#0374F8" },
              ]}
            >
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
