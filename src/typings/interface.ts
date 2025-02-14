import type { TReduxStatus, TRegisterSliceInitialState } from "./types";

export interface IRegisterSliceInitialState {
  role: TRegisterSliceInitialState | "";
  email: string;
  password: string;
}

export interface IRegisterProps {
  role: TRegisterSliceInitialState | "";
  email: string;
  password: string;
}

export interface ILoginAuth {
  email: string;
  password: string;
}

export interface ILoginResponseType {
  message: string;
  token?: string;
  data?: {
    id: string;
    verified: boolean;
    role: "PATIENT" | "DOCTOR";
  };
}

export interface ILoginSliceInitialState {
  login: {
    response: ILoginResponseType;
    status: TReduxStatus;
  };
  email: string;
  password: string;
}

export interface IVerificationSliceInitialState {
  verify: IAccountVerification;
  accountVerification: {
    response: { message: string } | { error: string };
    status: TReduxStatus;
  };
}

export interface IAccountVerification {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  phoneNumber: string;
  homeAddress: string;
  frontId: string;
  backId: string;
  idType: string;
  selfie: string;
  specialties: string;
}

export interface ISettingsSliceInitialState {
  changeName: ISettingsChangeNameType;
  getChangeName: {
    response: ISettingsGetChangeName;
    status: TReduxStatus;
  };
  updateChangeName: {
    response: ISettingsUpdateChangeName;
    status: TReduxStatus;
  };
  getAccountDetails: {
    response: {
      firstName: string;
      middleName: string;
      lastName: string;
      user: {
        role: string;
      };
    };
    status: TReduxStatus;
  };
}

interface NodeError {
  error: string;
}

export interface IDoctorSettingSliceInitialState {
  getInfoAccount: {
    response: IGetInfoAccount;
    status: TReduxStatus;
  };
}

export interface IGetInfoAccount {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  location: string;
  homeAddress: string;
  phoneNumber: string;
  usersId: string;
  specialties: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    role: "DOCTOR" | "PATIENT";
  };
}

export interface IDoctorMessageSliceInitialState {
  viewMessageList: {
    response: Array<IPatientViewMessageList>;
    status: TReduxStatus;
  };
  viewPatientMessages: {
    response: Array<IDoctorViewPatientMessages>;
    status: TReduxStatus;
  };
  sendMessages: {
    response: Array<IDoctorViewPatientMessages>;
    status: TReduxStatus;
  };
  messageInput: string;
}

export interface IDoctorViewPatientMessages {
  id: string;
  doctorId: string;
  patientId: string;
  message: string;
  role: "PATIENT" | "DOCTOR";
  createdAt: Date;
  updatedAt: Date;
}

export interface IPatientViewMessageList {
  id: string;
  patientId: string;
  doctorId: string;
  message: string;
  role: "PATIENT" | "DOCTOR";
  patient: {
    userInformation: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IHumanModelSliceInitialState {
  assessmentPage: number;
  showAssessmentShow: boolean;
  redDotModelPosition: number[];
  focusAssessment: Array<{ focus: string; value: string }>;
  captureHumanModel: string;
  generativeHumanModel: {
    response: IHumanModelGenerativeHumanModel;
    status: TReduxStatus;
  };
}

export interface IDoctorAppointmentSliceInitialState {
  viewAllAppointment: {
    response: Array<IDoctorViewAllAppointment>;
    status: TReduxStatus;
  };
  actionAppointment: {
    response: { message: string } | NodeError;
    status: TReduxStatus;
  };
}

export interface IDoctorViewAllAppointment {
  id: string;
  patientId: string;
  doctorId: string;
  status: string;
  symptoms: string;
  dateAppoint: Date;
  createdAt: Date;
  updatedAt: Date;
  patient: {
    userInformation: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
  };
  doctor: {
    userInformation: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
  };
}

export interface IMessageSliceInitialState {
  viewMessageList: {
    response: Array<IViewMessageList>;
    status: TReduxStatus;
  };
  viewDoctorMessages: {
    response: Array<IViewDoctorMessages>;
    status: TReduxStatus;
  };
  messageInput: string;
  sendMessages: {
    response: IPatientSendMessages;
    status: TReduxStatus;
  };
}

export interface IPatientSendMessages {
  id: string;
  doctorId: string;
  patientId: string;
  message: string;
  role: "PATIENT" | "DOCTOR";
  createdAt: Date;
  updatedAt: Date;
}

export interface IViewDoctorMessages {
  id: string;
  doctorId: string;
  patientId: string;
  message: string;
  role: "PATIENT" | "DOCTOR";
  createdAt: Date;
  updatedAt: Date;
}

export interface IViewMessageList {
  id: string;
  doctorId: string;
  patientId: string;
  message: string;
  role: "PATIENT" | "DOCTOR";
  doctor: {
    userInformation: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IAppointmentSliceInitialState {
  viewAllDoctors: { response: Array<IViewAllDoctor>; status: TReduxStatus };
  appointment: {
    doctorId: string;
    symptoms: string;
    dateAppoint: Date;
  };
  addAppointment: {
    response: { message: string } | NodeError;
    status: TReduxStatus;
  };
  viewAllAppointment: {
    response: Array<IViewAllAppointment>;
    status: TReduxStatus;
  };
}

export interface IViewAllAppointment {
  doctor: {
    userInformation: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
  };
  patientId: string;
  doctorId: string;
  status: string;
  symptoms: string;
  dateAppoint: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddAppointment {
  doctorId: string;
  symptoms: string;
  dateAppoint: Date;
}

export interface IViewAllDoctor {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  userInformation: {
    firstName: string;
    middleName: string;
    lastName: string;
    specialties: string;
  };
}

export interface IHumanModelGenerativeHumanModel {
  message?: string;
  error?: string;
}

export interface ISettingsUpdateChangeName {
  message?: string;
  error?: string;
}

export interface ISettingsChangeNameType {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
}

export interface ISettingsGetChangeName {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  location: string;
  usersId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICustomModalType {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  missingInfo?: boolean;
  emailNotFound?: boolean;
  incorrectPassword?: boolean;
  emailAlreadyInUse?: boolean;
  invalidPassword?: boolean;
  invalidEmail?: boolean;
  accountPending?: boolean;
}

export interface IAssessmentObject {
  [key: string]: string;
}

export interface IGenerativeHumanModel {
  quality: string;
  severity: string;
  timing: string;
  duration: string;
  associatedSymptoms: string;
  exacerbatingOrRelievingFactor: string;
  pastMedicalHistory: string;
  medicationAndAllergyHistory: string;
  riskFactors: string;
  lifeStyleAndSocialHistory: string;
  location: string;
}

export interface IFormDataGenerativeHumanModel {
  [key: string]: string | number;
}
