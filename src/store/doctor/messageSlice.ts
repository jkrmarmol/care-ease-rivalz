import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiDoctor } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IDoctorMessageSliceInitialState } from "../../typings/interface";

export const viewMessageList = createAsyncThunk("message/viewList", async () => {
  try {
    const response = await apiDoctor.get("/messages", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {}
});

export const viewPatientMessages = createAsyncThunk("message/viewPatient", async (data: { patientId: string }) => {
  try {
    const response = await apiDoctor.get(`/messages/${data.patientId}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {}
});

export const sendMessages = createAsyncThunk(
  "message/send",
  async ({ patientId, message }: { patientId: string; message: string }) => {
    try {
      const response = await apiDoctor.post(
        `/messages`,
        { patientId, message },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {}
  }
);

let initialState: IDoctorMessageSliceInitialState = {
  viewMessageList: {
    response: [],
    status: null,
  },
  viewPatientMessages: {
    response: [],
    status: null,
  },
  sendMessages: {
    response: [],
    status: null,
  },
  messageInput: "",
};

const messageSlice = createSlice({
  name: "messageSlice",
  reducers: {
    setMessageInput: (state, action: PayloadAction<string>) => {
      state.messageInput = action.payload;
    },
  },
  initialState,
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
      .addCase(viewPatientMessages.pending, (state, action) => {
        state.viewPatientMessages.status = "loading";
      })
      .addCase(viewPatientMessages.fulfilled, (state, action) => {
        state.viewPatientMessages.status = "ok";
        state.viewPatientMessages.response = action.payload;
      })
      .addCase(viewPatientMessages.rejected, (state, action) => {
        state.viewPatientMessages.status = "failed";
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
