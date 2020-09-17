import { signing_secret, token, name, apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId } from './config';
import { App } from "@slack/bolt";
import {
  filterDM,
  filterNoBotMessages,
  filterChannel,
} from "./middleware/index";
import * as features from "./features/index";
import "firebase/app";
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';

export const app = new App({
  signingSecret: signing_secret,
  token: token,
});

const firebase = initializeApp({
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
});

export const db = firebase.firestore();
export const storage = firebase.storage();

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log(`${name} is running! 🔥`);
  console.log("running on:", firebase.name)

  for (const [feature, handler] of Object.entries(features)) {
    handler(app);
    console.log(`Feature "${feature}" has been loaded.`);
  }
})();
