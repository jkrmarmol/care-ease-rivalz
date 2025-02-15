import { View, Text, Modal, useWindowDimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import QuestionModal from "./QuestionModal";
import painAssessment from "../../../constant/painAssessment";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import {
  setNextAssessmentPage,
  setBackAssessmentPage,
  showQuestionShow,
  generativeHumanModel,
} from "../../../store/patient/humanModelSlice";
import type { IAssessmentObject, ICustomModalType, IGenerativeHumanModel } from "../../../typings/interface";
import CustomModal from "../../modal/CustomModal";
import LottieView from "lottie-react-native";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { getApp } from "@react-native-firebase/app";

export default function PromptModal({ visible }: { visible: boolean }) {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const selectAssessmentPage = useAppSelector((state) => state.patientHumanModel.assessmentPage);
  const selectAssessmentInput = useAppSelector((state) => state.patientHumanModel.focusAssessment);
  const selectHumanModelUri = useAppSelector((state) => state.patientHumanModel.captureHumanModel);
  const [modal, setModal] = useState<ICustomModalType>({
    loading: false,
    success: false,
    error: false,
  });
  const onPressSubmitAssessmentInput = async () => {
    setModal((prev) => ({ ...prev, loading: true }));
    dispatch(showQuestionShow(false));
    const assessmentObject: IAssessmentObject = selectAssessmentInput.reduce(
      (acc: IAssessmentObject, { focus, value }) => {
        acc[focus] = value;
        return acc;
      },
      {}
    );
    getApp()
      .storage()
      .ref("humanModel")
      .child(new Date().toISOString() + ".jpg")
      .putFile(selectHumanModelUri)
      .then((result) => {
        console.log(result);
        setModal((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => console.log(error));

    // getApp().functions().useEmulator("192.168.100.95", 5001);
    // getApp()
    //   .functions()
    //   .httpsCallable("helloWorld")({ ...assessmentObject, location: selectHumanModelUri })
    //   .then((result) => {
    //     if (result) {
    //       console.log(result.data);
    //       setModal((prev) => ({ ...prev, loading: false }));
    //     }
    //   })
    //   .catch((error) => console.log(error));

    // const { payload } = await dispatch(
    //   generativeHumanModel({ ...assessmentObject, location: selectHumanModelUri } as IGenerativeHumanModel)
    // );
    // setModal((prev) => ({ ...prev, loading: false }));
    // if (payload) {
    //   return nav.navigate("PatientModelResponse", { data: payload.data });
    // }
  };
  return (
    <>
      <CustomModal
        visible={modal.loading}
        icon={
          <LottieView
            autoPlay
            style={{
              width: 200,
              height: 200,
            }}
            source={require("../../../assets/lottiefiles/68W5RbKLMa.json")}
          />
        }
        setModal={setModal}
        modalType="loading"
        showButton={false}
        showExitButton={false}
      />
      <Modal visible={visible} statusBarTranslucent presentationStyle="overFullScreen" transparent animationType="fade">
        <View
          style={{
            backgroundColor: "#000000B3",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: (90 / 100) * width,
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
            }}
          >
            {Object.entries(painAssessment).map((e, index) => {
              if (selectAssessmentPage === index) {
                return (
                  <QuestionModal
                    key={index}
                    jsKey={e[0]}
                    focus={e[1].focus}
                    question={e[1].question}
                    suggestions={e[1].suggestions}
                  />
                );
              }
            })}
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 10,
              }}
            >
              {Object.keys(painAssessment).length - 1 === selectAssessmentPage ? (
                <>
                  <TouchableOpacity
                    onPress={() => dispatch(setBackAssessmentPage())}
                    style={{
                      backgroundColor: "#0374F8",
                      paddingVertical: 12,
                      borderRadius: 8,
                      flexGrow: 1,
                    }}
                  >
                    <Text style={{ fontFamily: "KalekoBold", color: "#fff", textAlign: "center" }}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onPressSubmitAssessmentInput}
                    style={{
                      backgroundColor: "#00FF00",
                      paddingVertical: 12,
                      borderRadius: 8,
                      flexGrow: 1,
                    }}
                  >
                    <Text style={{ fontFamily: "KalekoBold", color: "#fff", textAlign: "center" }}>Submit</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => dispatch(setBackAssessmentPage())}
                    style={{
                      backgroundColor: "#0374F8",
                      paddingVertical: 12,
                      borderRadius: 8,
                      flexGrow: 1,
                    }}
                  >
                    <Text style={{ fontFamily: "KalekoBold", color: "#fff", textAlign: "center" }}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => dispatch(setNextAssessmentPage())}
                    style={{
                      backgroundColor: "#0374F8",
                      paddingVertical: 12,
                      borderRadius: 8,
                      flexGrow: 1,
                    }}
                  >
                    <Text style={{ fontFamily: "KalekoBold", color: "#fff", textAlign: "center" }}>Next</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <TouchableOpacity
              onPress={() => dispatch(showQuestionShow(false))}
              style={{
                backgroundColor: "#ff1249",
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontFamily: "KalekoBold", color: "#fff", textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
