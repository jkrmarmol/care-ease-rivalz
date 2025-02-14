import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAuth } from "../api";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ILoginAuth,
  ILoginResponseType,
  ILoginSliceInitialState,
} from "../../typings/interface";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: ILoginAuth) => {
    try {
      const data = await apiAuth.post("/login", {
        email,
        password,
      });
      if (data.data.message === "Login successfully") {
        await AsyncStorage.setItem("token", data.data.token);
      }
      return data.data;
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

export const isAuthenticated = createAsyncThunk(
  "auth/isAuthenticated",
  async () => {
    try {
      const response = await apiAuth.get("/check-authorization", {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
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
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await AsyncStorage.removeItem("token");
    return { message: "Logout successfully" };
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response) {
        return err.response.data;
      }
      return err.cause;
    }
  }
});

let initialState: ILoginSliceInitialState = {
  login: {
    response: {
      message: "",
    },
    status: null,
  },
  email: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    cleanUpLogin: (state) => {
      state.email = "";
      state.password = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.login.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ILoginResponseType>) => {
          state.login.status = "ok";
          state.login.response = action.payload;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.login.status = "failed";
      });
  },
});

export const { setEmail, setPassword, cleanUpLogin } = loginSlice.actions;
export default loginSlice.reducer;
