/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp();
export const helloWorld = onRequest((request, response) => {
  //   response.json(request.);
});
