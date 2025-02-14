import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import painAssessment from "../../constant/painAssessment";
import { AxiosError } from "axios";
import { apiPatient } from "../api";
import type { IGenerativeHumanModel, IHumanModelSliceInitialState } from "../../typings/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const generativeHumanModel = createAsyncThunk(
  "humanModelSlice/generativeHumanModel",
  async (data: IGenerativeHumanModel) => {
    try {
      let formData: FormData = new FormData();
      for (let assessment in data as IGenerativeHumanModel) {
        if (assessment === "location") {
          // @ts-ignore
          formData.append(assessment, {
            uri: data[assessment],
            name: "humanModelPain.jpg",
            type: "image/jpg",
          });
        } else {
          // @ts-ignore
          formData.append(assessment, data[assessment]);
        }
      }
      const response = await apiPatient.post("/generativeHumanModel", formData, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          console.error(err.response.data);
          return err.response.data;
        }
        return err.cause;
      }
    }
  }
);

let initialState: IHumanModelSliceInitialState = {
  assessmentPage: 0,
  showAssessmentShow: false,
  redDotModelPosition: [],
  focusAssessment: [],
  captureHumanModel: "",
  generativeHumanModel: {
    response: {},
    status: null,
  },
};

const humanModelSlice = createSlice({
  name: "humanModelSlice",
  initialState,
  reducers: {
    setNextAssessmentPage: (state) => {
      if (state.assessmentPage < Object.keys(painAssessment).length - 1 && state.assessmentPage >= 0) {
        state.assessmentPage = state.assessmentPage + 1;
      }
    },
    setBackAssessmentPage: (state) => {
      if (state.assessmentPage <= Object.keys(painAssessment).length && state.assessmentPage >= 1) {
        state.assessmentPage = state.assessmentPage - 1;
      }
    },
    showQuestionShow: (state, action: PayloadAction<boolean>) => {
      state.showAssessmentShow = action.payload;
      if (action.payload === false) {
        state.redDotModelPosition = [];
        state.focusAssessment = [];
        state.assessmentPage = 0;
      }
    },
    setRedDotPosition: (state, action: PayloadAction<number[]>) => {
      state.redDotModelPosition = action.payload;
    },
    setAssessment: (state, { payload }: PayloadAction<{ focus: string; value: string }>) => {
      state.focusAssessment = state.focusAssessment.filter((item) => item.focus !== payload.focus);
      state.focusAssessment = [...state.focusAssessment, { focus: payload.focus, value: payload.value }];
    },
    setCaptureHumanModel: (state, action: PayloadAction<string>) => {
      state.captureHumanModel = action.payload;
    },
    setHumanModelCleanUp: (state) => {
      state.redDotModelPosition = [];
      state.focusAssessment = [];
      state.showAssessmentShow = false;
      state.assessmentPage = 0;
      state.captureHumanModel = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generativeHumanModel.pending, (state, action) => {
        state.generativeHumanModel.status = "loading";
      })
      .addCase(generativeHumanModel.fulfilled, (state, action) => {
        state.generativeHumanModel.status = "ok";
        state.generativeHumanModel.response = action.payload;
      })
      .addCase(generativeHumanModel.rejected, (state, action) => {
        state.generativeHumanModel.status = "failed";
      });
  },
});

export const {
  setBackAssessmentPage,
  setNextAssessmentPage,
  showQuestionShow,
  setRedDotPosition,
  setAssessment,
  setCaptureHumanModel,
  setHumanModelCleanUp,
} = humanModelSlice.actions;
export default humanModelSlice.reducer;
