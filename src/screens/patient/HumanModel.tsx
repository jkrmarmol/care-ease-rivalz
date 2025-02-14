import { View, useWindowDimensions, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import CanvasThree from "../../components/3DModel/CanvasThree";
import PromptModal from "../../components/patient/3d/PromptModal";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { showQuestionShow } from "../../store/patient/humanModelSlice";
import ViewShot from "react-native-view-shot";
import { setCaptureHumanModel } from "../../store/patient/humanModelSlice";

export default function HumanModel() {
  const viewRef = useRef<ViewShot | any>(null);
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const selectShowAssessmentShow = useAppSelector((state) => state.patientHumanModel.showAssessmentShow);
  const selectRedDotPosition = useAppSelector((state) => state.patientHumanModel.redDotModelPosition);

  useEffect(() => {
    (async () => {
      if (viewRef && viewRef.current) {
        const uri = await viewRef.current.capture();
        dispatch(setCaptureHumanModel(uri));
      }
    })();
  }, [selectRedDotPosition]);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PromptModal visible={selectShowAssessmentShow} />
      <ViewShot ref={viewRef} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }} style={{ flex: 1 }}>
        <CanvasThree />
      </ViewShot>
      {selectRedDotPosition.length !== 0 && (
        <TouchableOpacity
          onPress={() => dispatch(showQuestionShow(true))}
          style={{
            backgroundColor: "#0374F8",
            paddingVertical: 16,
            borderRadius: 12,
            marginVertical: 10,
            position: "absolute",
            bottom: 0,
            width: (90 / 100) * width,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "CenturyGothicBold",
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
