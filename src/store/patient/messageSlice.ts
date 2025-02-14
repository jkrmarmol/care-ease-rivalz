import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiPatient } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMessageSliceInitialState } from "../../typings/interface";

export const viewMessageList = createAsyncThunk("message/viewList", async () => {
  try {
    const response = await apiPatient.get("/messages", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {}
});

export const viewDoctorMessages = createAsyncThunk("message/viewDoctor", async (data: { doctorId: string }) => {
  try {
    const response = await apiPatient.get(`/messages/${data.doctorId}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {}
});

export const sendMessages = createAsyncThunk("message/send", async (data: { doctorId: string; message: string }) => {
  try {
    const response = await apiPatient.post(
      "/messages",
      {
        doctorId: data.doctorId,
        message: data.message,
      },
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {}
});

let initialState: IMessageSliceInitialState = {
  viewMessageList: {
    response: [],
    status: null,
  },
  viewDoctorMessages: {
    response: [],
    status: null,
  },
  messageInput: "",
  sendMessages: {
    response: {
      id: "",
      doctorId: "",
      patientId: "",
      message: "",
      role: "PATIENT",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: null,
  },
};

const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setMessageInput: (state, action: PayloadAction<string>) => {
      state.messageInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewMessageList.pending, (state, action) => {
        state.viewMessageList.status = "loading";
      })
      .addCase(viewMessageList.fulfilled, (state, action) => {
        state.viewMessageList.status = "ok";
        state.viewMessageList.response = action.payload;
      })
      .addCase(viewMessageList.rejected, (state, action) => {
        state.viewMessageList.status = "failed";
      })
      .addCase(viewDoctorMessages.pending, (state, action) => {
        state.viewDoctorMessages.status = "loading";
      })
      .addCase(viewDoctorMessages.fulfilled, (state, action) => {
        state.viewDoctorMessages.status = "ok";
        state.viewDoctorMessages.response = action.payload;
      })
      .addCase(viewDoctorMessages.rejected, (state, action) => {
        state.viewDoctorMessages.status = "failed";
      })
      .addCase(sendMessages.pending, (state, action) => {
        state.sendMessages.status = "loading";
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        state.sendMessages.status = "ok";
        state.sendMessages.response = action.payload;
      })
      .addCase(sendMessages.rejected, (state, action) => {
        state.sendMessages.status = "failed";
      });
  },
});

export const { setMessageInput } = messageSlice.actions;
export default messageSlice.reducer;
