import path from "path";
import fs from "fs-extra";
import axios from "axios";

import { GoogleAIFileManager } from "@google/generative-ai/server";
import { defineString } from "firebase-functions/params";

const googleAIApiKey = defineString("GOOGLE_AI_API_KEY");
const fileManager = new GoogleAIFileManager(googleAIApiKey.value());

export async function downloadImage(url: string) {
  const fileName = `temp_${Date.now()}.jpg`;
  const filePath = path.join(__dirname, fileName);

  const response = await axios({
    url,
    responseType: "stream",
  });

  await new Promise<void>((resolve, reject) => {
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  return filePath;
}

export async function uploadToGeminiFromURL(imageUrl: string, mimeType: string) {
  try {
    const localFilePath = await downloadImage(imageUrl);
    const uploadedFile = await uploadToGemini(localFilePath, mimeType);
    await fs.remove(localFilePath);
    return uploadedFile;
  } catch (error) {
    throw new Error("Error uploading from URL");
  }
}

export async function uploadToGemini(path: string, mimeType: string) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  return file;
}
