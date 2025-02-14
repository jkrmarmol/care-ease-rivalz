import axios from "axios";
console.log("API: " + process.env.EXPO_PUBLIC_API_URL);
export const apiAuth = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth`,
});

export const apiPatient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1/patient`,
});

export const apiDoctor = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1/doctor`,
});
