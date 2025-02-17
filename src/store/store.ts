import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./auth/registerSlice";
import loginReducer from "./auth/loginSlice";
import patientSettingsReducer from "./patient/settingsSlice";
import patientHumanModelReducer from "./patient/humanModelSlice";
import authVerificationReducer from "./auth/verificationSlice";
import patientAppointmentReducer from "./patient/appointmentSlice";
import doctorAppointmentReducer from "./doctor/appointmentSlice";
import patientMessageReducer from "./patient/messageSlice";
import doctorMessageReducer from "./doctor/messageSlice";
import doctorSettingReducer from "./doctor/settingSlice";
import { firebaseApiSlice } from "./firebaseApiSlice";

const store = configureStore({
  reducer: {
    registerAuth: registerReducer,
    loginAuth: loginReducer,
    patientSettings: patientSettingsReducer,
    patientHumanModel: patientHumanModelReducer,
    authVerification: authVerificationReducer,
    patientAppointment: patientAppointmentReducer,
    doctorAppointment: doctorAppointmentReducer,
    patientMessage: patientMessageReducer,
    doctorMessage: doctorMessageReducer,
    doctorSetting: doctorSettingReducer,
    [firebaseApiSlice.reducerPath]: firebaseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([firebaseApiSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
