import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiDoctor } from "../api";
import { IDoctorAppointmentSliceInitialState } from "../../typings/interface";

export const viewAllAppointment = createAsyncThunk("appointment/viewAll", async () => {
  try {
    const response = await apiDoctor.get("/appointment-list", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {}
});

export const actionAppointment = createAsyncThunk(
  "appointment/action",
  async (data: { id: string; action: "accept" | "reject" }) => {
    try {
      const response = await apiDoctor.post(
        `/appointment/${data.id}/${data.action}`,
        {},
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

let initialState: IDoctorAppointmentSliceInitialState = {
  viewAllAppointment: {
    response: [],
    status: null,
  },
  actionAppointment: {
    response: { message: "" },
    status: null,
  },
};

const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewAllAppointment.pending, (state, action) => {
        state.viewAllAppointment.status = "loading";
      })
      .addCase(viewAllAppointment.fulfilled, (state, action) => {
        state.viewAllAppointment.status = "ok";
        state.viewAllAppointment.response = action.payload;
      })
      .addCase(viewAllAppointment.rejected, (state, action) => {
        state.viewAllAppointment.status = "failed";
      })
      .addCase(actionAppointment.pending, (state, action) => {
        state.actionAppointment.status = "loading";
      })
      .addCase(actionAppointment.fulfilled, (state, action) => {
        state.actionAppointment.status = "ok";
        state.actionAppointment.response = action.payload;
      })
      .addCase(actionAppointment.rejected, (state, action) => {
        state.actionAppointment.status = "failed";
      });
  },
});

export default appointmentSlice.reducer;
