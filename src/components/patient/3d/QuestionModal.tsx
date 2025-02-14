import { Text, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import { setAssessment } from "../../../store/patient/humanModelSlice";

export default function QuestionModal({ jsKey, focus, question, suggestions }: { jsKey: string; focus: string; question: string; suggestions: string[] }) {
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const selectAssessmentInput = useAppSelector((state) => state.patientHumanModel.focusAssessment);
  const data = selectAssessmentInput.filter((e) => e.focus === jsKey);
  return (
    <>
      <Text
        style={{
          fontFamily: "KalekoBold",
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        {focus}
      </Text>
      <Text
        style={{
          fontFamily: "KalekoBook",
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        {question}
      </Text>
      <TextInput
        multiline
        numberOfLines={4}
        defaultValue={data[0]?.value}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          fontFamily: "KalekoBook",
          height: (20 / 100) * height,
        }}
      />

      <Text
        style={{
          fontFamily: "KalekoBold",
          fontSize: 10,
          marginBottom: 4,
        }}
      >
        Suggestions:
      </Text>
      <ScrollView horizontal contentContainerStyle={{ gap: 8, marginBottom: 16 }}>
        {suggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={{ borderWidth: 1, padding: 6, flex: 1, width: (40 / 100) * width }}
            onPress={() => dispatch(setAssessment({ focus: jsKey, value: suggestion }))}
          >
            <Text
              style={{
                fontFamily: "KalekoBook",
                fontSize: 10,
              }}
            >
              {suggestion}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
