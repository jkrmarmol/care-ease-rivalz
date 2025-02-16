import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { GoogleGenerativeAI } from "@google/generative-ai";
import RivalzClient from "rivalz-client";
import { defineString } from "firebase-functions/params";
import { uploadToGeminiFromURL } from "./utils";
import { TBodyData } from "./types";

initializeApp();
const googleAIApiKey = defineString("GOOGLE_AI_API_KEY");
const rivalZEnvironment = defineString("RIVALZ_API_KEY");

export const helloWorld = onRequest(async (request, response) => {
  try {
    const genAI = new GoogleGenerativeAI(googleAIApiKey.value());
    const rivalZClient = new RivalzClient(rivalZEnvironment.value());
    const bodyData: TBodyData = request.body;
    const uploadedToGemini = await uploadToGeminiFromURL(bodyData.location, "image/jpeg");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction:
        "Looking at the 3D human model, describe the precise anatomical location of the red dot = pain.  Be as specific as possible, referencing nearby anatomical landmarks and structures.\n",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: "image/jpeg",
                fileUri: uploadedToGemini.uri,
              },
            },
          ],
        },
      ],
    });

    const result = (await chatSession.sendMessage("")).response.text();
    const newData = { ...bodyData, location: result };
    const rivalZResult = await rivalZClient.createChatSession(
      "67aedc4d9c365432bb7d6125",
      "I'm a professional doctor, can you help me with my patient, here is my assessment:" + JSON.stringify(newData)
    );
    response.json(rivalZResult);
  } catch (err) {
    console.error(err);
    response.json({ error: err });
  }
});
