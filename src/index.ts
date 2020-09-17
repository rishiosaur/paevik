import { signing_secret, token, name } from "./config";
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
  apiKey: "AIzaSyBIFkxMVVKRUmLWJmwWHC9KEySST7VfU-g",
  authDomain: "paevik-bot.firebaseapp.com",
  databaseURL: "https://paevik-bot.firebaseio.com",
  projectId: "paevik-bot",
  storageBucket: "paevik-bot.appspot.com",
  messagingSenderId: "703117243972",
  appId: "1:703117243972:web:bc0bb786de678fe66bee11",
  measurementId: "G-8340LLTRRZ",
});

export const db = firebase.firestore();
export const storage = firebase.storage();

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log(`${name} is running! 🔥`);

  for (const [feature, handler] of Object.entries(features)) {
    handler(app);
    console.log(`Feature "${feature}" has been loaded.`);
  }
})();
