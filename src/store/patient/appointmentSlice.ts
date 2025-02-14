import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IAddAppointment, IAppointmentSliceInitialState } from "../../typings/interface";
import { apiPatient } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const viewAllDoctors = createAsyncThunk("appointment/viewAllDoctors", async () => {
  try {
    const response = await apiPatient.get("/view-all-doctor", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {}
});

export const addAppointment = createAsyncThunk("appointment/addAppointment", async (data: IAddAppointment) => {
  try {
    const response = await apiPatient.post("/appointment", data, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {}
});

export const viewAllAppointment = createAsyncThunk("appointment/viewAllAppointment", async () => {
  try {
    const response = await apiPatient.get("/appointment-list", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {}
});

let initialState: IAppointmentSliceInitialState = {
  viewAllDoctors: {
    response: [],
    status: null,
  },
  appointment: {
    doctorId: "",
    symptoms: "",
    dateAppoint: new Date(),
  },
  addAppointment: {
    response: {
      message: "",
    },
    status: null,
  },
  viewAllAppointment: {
    response: [],
    status: null,
  },
};

const appointmentSlice = createSlice({
  name: "humanModelSlice",
  initialState,
  reducers: {
    setDoctorId: (state, action: PayloadAction<string>) => {
      state.appointment.doctorId = action.payload;
    },
    setSymptoms: (state, action: PayloadAction<string>) => {
      state.appointment.symptoms = action.payload;
    },
    setDateAppoint: (state, action: PayloadAction<Date>) => {
      state.appointment.dateAppoint = action.payload;
    },
    cleanUpAppointment: (state) => {
      state.appointment.doctorId = "";
      state.appointment.symptoms = "";
      state.appointment.dateAppoint = new Date();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewAllDoctors.pending, (state, action) => {
        state.viewAllDoctors.status = "loading";
      })
      .addCase(viewAllDoctors.fulfilled, (state, action) => {
        state.viewAllDoctors.status = "ok";
        state.viewAllDoctors.response = action.payload;
      })
      .addCase(viewAllDoctors.rejected, (state, action) => {
        state.viewAllDoctors.status = "failed";
      })
      .addCase(addAppointment.pending, (state, action) => {
        state.addAppointment.status = "loading";
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.addAppointment.status = "ok";
        state.addAppointment.response = action.payload;
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.addAppointment.status = "failed";
      })
      .addCase(viewAllAppointment.pending, (state, action) => {
        state.viewAllAppointment.status = "loading";
      })
      .addCase(viewAllAppointment.fulfilled, (state, action) => {
        state.viewAllAppointment.status = "ok";
        state.viewAllAppointment.response = action.payload;
      })
      .addCase(viewAllAppointment.rejected, (state, action) => {
        state.viewAllAppointment.status = "failed";
      });
  },
});

export const { setDoctorId, setSymptoms, setDateAppoint, cleanUpAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
