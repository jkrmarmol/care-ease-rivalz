import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const firebaseApiSlice = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://generaterivalz-qq2ia7b5wa-uc.a.run.app",
    validateStatus: (response, result) => {
      return true;
    },
  }),
  endpoints: (builder) => ({
    postGenerateRag: builder.mutation({
      query: (data: {
        location?: string;
        quality?: string;
        severity?: string;
        timing?: string;
        duration?: string;
        associatedSymptoms?: string;
        exacerbatingOrRelievingFactors?: string;
        internalVsExternalPain?: string;
        pastMedicalHistory?: string;
        medicationAndAllergyHistory?: string;
        riskFactors?: string;
        lifestyleAndSocialHistory?: string;
      }) => ({
        url: "/generateRivalZ",
        method: "POST",
        body: data,
      }),
      transformResponse: (
        response: {
          answer: string;
          session_id: string;
          userId: string;
        },
        meta
      ) => {
        return { status: meta?.response?.status, data: response };
      },
    }),
  }),
});

export const { usePostGenerateRagMutation } = firebaseApiSlice;
