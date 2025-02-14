import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { apiAuth } from "../api";
import type {
  IRegisterProps,
  IRegisterSliceInitialState,
} from "../../typings/interface";
import type { TRegisterSliceInitialState } from "../../typings/types";

let initialState: IRegisterSliceInitialState = {
  role: "",
  email: "",
  password: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, role }: IRegisterProps) => {
    try {
      const response = await apiAuth.post("/register", {
        email,
        password,
        role: role === "doctor" ? "DOCTOR" : "PATIENT",
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

export const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<TRegisterSliceInitialState>) => {
      state.role = action.payload;
    },
    setEmail: (state, action: { payload: string }) => {
      state.email = action.payload;
    },
    setPassword: (state, action: { payload: string }) => {
      state.password = action.payload;
    },
    cleanUpRegister: (state) => {
      state.email = "";
      state.password = "";
      state.role = "";
    },
  },
  extraReducers: () => {},
});

export const { setRole, setEmail, setPassword, cleanUpRegister } =
  registerSlice.actions;
export default registerSlice.reducer;
