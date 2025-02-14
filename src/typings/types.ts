export type TRegisterSliceInitialState = "patient" | "doctor";
export type TReduxStatus = null | "loading" | "ok" | "failed";
export type TCustomModalType =
  | "loading"
  | "error"
  | "success"
  | "pending"
  | "missingInfo"
  | "emailNotFound"
  | "incorrectPassword"
  | "emailAlreadyInUse"
  | "invalidPassword"
  | "invalidEmail";
