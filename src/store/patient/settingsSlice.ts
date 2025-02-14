import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  ISettingsChangeNameType,
  ISettingsGetChangeName,
  ISettingsSliceInitialState,
  ISettingsUpdateChangeName,
} from "../../typings/interface";
import { AxiosError } from "axios";
import { apiPatient } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export const getChangeName = createAsyncThunk("settings/getChangeName", async () => {
  try {
    const response = await apiPatient.get("/settings/changeName", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
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

export const updateChangeName = createAsyncThunk(
  "settings/updateChangeName",
  async ({ firstName, middleName, lastName, birthDate }: ISettingsChangeNameType) => {
    try {
      const response = await apiPatient.put(
        "/settings/changeName",
        {
          firstName,
          middleName,
          lastName,
          birthDate: moment(birthDate).format("YYYY-MM-DD"),
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          return err.response.data;
        }
        return err.cause;
      }
    }
  }
);

export const getAccountDetails = createAsyncThunk("settings/getAccountDetails", async () => {
  try {
    const response = await apiPatient.get("/account", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
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

let initialState: ISettingsSliceInitialState = {
  changeName: {
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: new Date(),
  },
  getChangeName: {
    response: {
      id: "",
      usersId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: new Date(),
      location: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: null,
  },
  updateChangeName: {
    response: {},
    status: null,
  },
  getAccountDetails: {
    response: {
      firstName: "",
      middleName: "",
      lastName: "",
      user: {
        role: "",
      },
    },
    status: null,
  },
};

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.changeName.firstName = action.payload;
    },
    setMiddleName: (state, action: PayloadAction<string>) => {
      state.changeName.middleName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.changeName.lastName = action.payload;
    },
    setBirthDate: (state, action: PayloadAction<Date>) => {
      state.changeName.birthDate = action.payload;
    },
    cleanUpChangeName: (state) => {
      state.changeName.firstName = "";
      state.changeName.middleName = "";
      state.changeName.lastName = "";
      state.changeName.birthDate = new Date();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChangeName.pending, (state, action) => {
        state.getChangeName.status = "loading";
      })
      .addCase(getChangeName.fulfilled, (state, action: PayloadAction<ISettingsGetChangeName>) => {
        state.getChangeName.status = "ok";
        state.getChangeName.response = action.payload;
        state.changeName.firstName = action.payload.firstName;
        state.changeName.middleName = action.payload.middleName;
        state.changeName.lastName = action.payload.lastName;
        state.changeName.birthDate = action.payload.birthDate;
      })
      .addCase(getChangeName.rejected, (state, action) => {
        state.getChangeName.status = "failed";
      })
      .addCase(updateChangeName.pending, (state, action) => {
        state.updateChangeName.status = "loading";
      })
      .addCase(updateChangeName.fulfilled, (state, action: PayloadAction<ISettingsUpdateChangeName>) => {
        state.updateChangeName.status = "ok";
        state.updateChangeName.response = action.payload;
      })
      .addCase(updateChangeName.rejected, (state, action) => {
        state.updateChangeName.status = "failed";
      })
      .addCase(getAccountDetails.pending, (state, action) => {
        state.getAccountDetails.status = "loading";
      })
      .addCase(getAccountDetails.fulfilled, (state, action) => {
        state.getAccountDetails.status = "ok";
        state.getAccountDetails.response = action.payload;
      })
      .addCase(getAccountDetails.rejected, (state, action) => {
        state.getAccountDetails.status = "failed";
      });
  },
});

export const { setFirstName, setBirthDate, setLastName, setMiddleName, cleanUpChangeName } = settingsSlice.actions;
export default settingsSlice.reducer;
