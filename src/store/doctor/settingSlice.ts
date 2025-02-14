import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IDoctorSettingSliceInitialState } from "../../typings/interface";
import { apiDoctor } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getInfoAccount = createAsyncThunk("setting/getInfoAccount", async () => {
  try {
    const response = await apiDoctor.get(`/account`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {}
});

let initialState: IDoctorSettingSliceInitialState = {
  getInfoAccount: {
    response: {
      id: "",
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: new Date(),
      location: "",
      homeAddress: "",
      phoneNumber: "",
      usersId: "",
      specialties: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        role: "PATIENT",
      },
    },
    status: null,
  },
};

const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfoAccount.pending, (state, action) => {
        state.getInfoAccount.status = "loading";
      })
      .addCase(getInfoAccount.fulfilled, (state, action) => {
        state.getInfoAccount.status = "ok";
        state.getInfoAccount.response = action.payload;
      })
      .addCase(getInfoAccount.rejected, (state, action) => {
        state.getInfoAccount.status = "failed";
      });
  },
});

export default settingSlice.reducer;
