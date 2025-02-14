import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  setBirthDate,
  setFirstName,
  setHomeAddress,
  setLastName,
  setMiddleName,
  setPhoneNumber,
  setSpecialties,
} from "../../../store/auth/verificationSlice";

export default function InformationVerification() {
  const dispatch = useAppDispatch();
  const selectVerifyInfo = useAppSelector((state) => state.authVerification.verify);
  const [show, setShow] = useState(false);
  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      dispatch(setBirthDate(selectedDate ? selectedDate : new Date()));
    }
  };
  const showDatepicker = () => {
    setShow(true);
  };
  return (
    <View
      style={{
        paddingVertical: 10,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: "KalekoBold",
          fontSize: 22,
        }}
      >
        Verify Information
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontFamily: "KalekoBold",
          color: "#00000066",
        }}
      >
        Enter your preferred name in this field. This could be your first name, full name, or a nickname that you're
        comfortable with.
      </Text>

      <View
        style={[
          {
            backgroundColor: "#0000000D",
            borderRadius: 14,
            overflow: "hidden",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginTop: 20,
          },
        ]}
      >
        <Text
          style={{
            color: "#0095FF",
            fontFamily: "KalekoBold",
            fontSize: 10,
          }}
        >
          First Name
        </Text>
        <TextInput
          onChangeText={(text) => dispatch(setFirstName(text))}
          defaultValue={selectVerifyInfo.firstName}
          placeholder="Please type your full name"
          placeholderTextColor="#00000066"
          style={{
            fontFamily: "KalekoBold",
            fontSize: 12,
          }}
        />
      </View>

      <View
        style={[
          {
            backgroundColor: "#0000000D",
            borderRadius: 14,
            overflow: "hidden",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginTop: 20,
          },
        ]}
      >
        <Text
          style={{
            color: "#0095FF",
            fontFamily: "KalekoBold",
            fontSize: 10,
          }}
        >
          Middle Name
        </Text>
        <TextInput
          defaultValue={selectVerifyInfo.middleName}
          onChangeText={(text) => dispatch(setMiddleName(text))}
          placeholder="Please type your full name"
          placeholderTextColor="#00000066"
          style={{
            fontFamily: "KalekoBold",
            fontSize: 12,
          }}
        />
      </View>

      <View
        style={[
          {
            backgroundColor: "#0000000D",
            borderRadius: 14,
            overflow: "hidden",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginTop: 20,
          },
        ]}
      >
        <Text
          style={{
            color: "#0095FF",
            fontFamily: "KalekoBold",
            fontSize: 10,
          }}
        >
          Last Name
        </Text>
        <TextInput
          defaultValue={selectVerifyInfo.lastName}
          onChangeText={(text) => dispatch(setLastName(text))}
          placeholder="Please type your full name"
          placeholderTextColor="#00000066"
          style={{
            fontFamily: "KalekoBold",
            fontSize: 12,
          }}
        />
      </View>

      <TouchableOpacity
        onPress={showDatepicker}
        style={[
          {
            backgroundColor: "#0000000D",
            borderRadius: 14,
            overflow: "hidden",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginTop: 20,
          },
        ]}
      >
        <Text
          style={{
            color: "#0095FF",
            fontFamily: "KalekoBold",
            fontSize: 10,
          }}
        >
          Birth Date
        </Text>
        <TextInput
          placeholder="Please select your birth date"
          defaultValue={
            moment(selectVerifyInfo.birthDate).format("YYYY-MM-DD") <= moment(new Date()).format("YYYY-MM-DD")
              ? moment(selectVerifyInfo.birthDate).format("YYYY-MM-DD")
              : undefined
          }
          editable={false}
          placeholderTextColor="#00000066"
          style={{
            fontFamily: "KalekoBold",
            fontSize: 12,
            color: "#000",
          }}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={"date"}
            is24Hour={false}
            onChange={onChange}
            maximumDate={new Date(2016, 0, 0)}
            minimumDate={new Date(1950, 1, 1)}
          />
        )}
      </TouchableOpacity>

      <View
        style={[
          {
            backgroundColor: "#0000000D",
            borderRadius: 14,
            overflow: "hidden",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginTop: 20,
          },
        ]}
      >
        <Text
          style={{
            color: "#0095FF",
            fontFamily: "KalekoBold",
            fontSize: 10,
          }}
        >
          Phone number
        </Text>
        <TextInput
          defaultValue={selectVerifyInfo.phoneNumber}
          onChangeText={(text) => dispatch(setPhoneNumber(text))}
          placeholder="Please type your phone no."
          placeholderTextColor="#00000066"
          style={{
            fontFamily: "KalekoBold",
            fontSize: 12,
          }}
        />
      </View>

      <View
        style={[
          {
            backgroundColor: "#0000000D",
            borderRadius: 14,
            overflow: "hidden",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginTop: 20,
          },
        ]}
      >
        <Text
          style={{
            color: "#0095FF",
            fontFamily: "KalekoBold",
            fontSize: 10,
          }}
        >
          Home address
        </Text>
        <TextInput
          defaultValue={selectVerifyInfo.homeAddress}
          onChangeText={(text) => dispatch(setHomeAddress(text))}
          placeholder="Please type your home address"
          placeholderTextColor="#00000066"
          style={{
            fontFamily: "KalekoBold",
            fontSize: 12,
          }}
        />
      </View>

      <View
        style={[
          {
            backgroundColor: "#0000000D",
            borderRadius: 14,
            overflow: "hidden",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginTop: 20,
          },
        ]}
      >
        <Text
          style={{
            color: "#0095FF",
            fontFamily: "KalekoBold",
            fontSize: 10,
          }}
        >
          Specialist
        </Text>
        <TextInput
          defaultValue={selectVerifyInfo.specialties}
          onChangeText={(text) => dispatch(setSpecialties(text))}
          placeholder="Please type your specialties"
          placeholderTextColor="#00000066"
          style={{
            fontFamily: "KalekoBold",
            fontSize: 12,
          }}
        />
      </View>

      {/* {selectLoginInfo.status === "ok" && selectLoginInfo.response.data?.role === "DOCTOR" && (
        <View
          style={[
            {
              backgroundColor: "#0000000D",
              borderRadius: 14,
              overflow: "hidden",
              paddingVertical: 8,
              paddingHorizontal: 20,
              marginTop: 20,
            },
          ]}
        >
          <Text
            style={{
              color: "#0095FF",
              fontFamily: "KalekoBold",
              fontSize: 10,
            }}
          >
            Specialist
          </Text>
          <TextInput
            placeholder="Please type your specialties"
            placeholderTextColor="#00000066"
            style={{
              fontFamily: "KalekoBold",
              fontSize: 12,
            }}
          />
        </View>
      )} */}
    </View>
  );
}
