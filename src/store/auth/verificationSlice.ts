import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { IAccountVerification, IVerificationSliceInitialState } from "../../typings/interface";
import { apiAuth } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";

export const accountVerification = createAsyncThunk("verification/account", async (data: IAccountVerification) => {
  try {
    const formData: FormData = new FormData();
    for (let key in data as IAccountVerification) {
      if (key === "frontId") {
        // @ts-ignore
        formData.append(key, {
          uri: data[key],
          name: "frontId.jpg",
          type: "image/jpg",
        });
      } else if (key === "backId") {
        // @ts-ignore
        formData.append(key, {
          uri: data[key],
          name: "backId.jpg",
          type: "image/jpg",
        });
      } else if (key === "selfie") {
        // @ts-ignore
        formData.append(key, {
          uri: data[key],
          name: "selfie.jpg",
          type: "image/jpg",
        });
      } else {
        // @ts-ignore
        formData.append(key, data[key]);
      }
    }
    const response = await apiAuth.post("/verify-account", formData, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response) {
        return err.response.data;
      }
      return err.cause;
    }
  }
});

let initialState: IVerificationSliceInitialState = {
  verify: {
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: new Date(),
    phoneNumber: "",
    homeAddress: "",
    frontId: "",
    backId: "",
    idType: "",
    selfie: "",
    specialties: "",
  },
  accountVerification: {
    response: {
      message: "",
    },
    status: null,
  },
};

const verificationSlice = createSlice({
  name: "verificationSlice",
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.verify.firstName = action.payload;
    },
    setMiddleName: (state, action: PayloadAction<string>) => {
      state.verify.middleName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.verify.lastName = action.payload;
    },
    setBirthDate: (state, action: PayloadAction<Date>) => {
      state.verify.birthDate = action.payload;
    },
    setHomeAddress: (state, action: PayloadAction<string>) => {
      state.verify.homeAddress = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.verify.phoneNumber = action.payload;
    },
    setFrontId: (state, action: PayloadAction<string>) => {
      state.verify.frontId = action.payload;
    },
    setBackId: (state, action: PayloadAction<string>) => {
      state.verify.backId = action.payload;
    },
    setIdType: (state, action: PayloadAction<string>) => {
      state.verify.idType = action.payload;
    },
    setSelfie: (state, action: PayloadAction<string>) => {
      state.verify.selfie = action.payload;
    },
    setSpecialties: (state, action: PayloadAction<string>) => {
      state.verify.specialties = action.payload;
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(accountVerification.pending, (state, action) => {
        state.accountVerification.status = "loading";
      })
      .addCase(accountVerification.fulfilled, (state, action) => {
        state.accountVerification.status = "ok";
        state.accountVerification.response = action.payload;
      })
      .addCase(accountVerification.rejected, (state, action) => {
        state.accountVerification.status = "failed";
      });
  },
});

export const {
  setFirstName,
  setMiddleName,
  setLastName,
  setBirthDate,
  setPhoneNumber,
  setFrontId,
  setBackId,
  setIdType,
  setSelfie,
  setHomeAddress,
  setSpecialties,
} = verificationSlice.actions;
export default verificationSlice.reducer;
