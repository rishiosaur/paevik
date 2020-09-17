// import moment from "moment";
import { db } from "../../index";
import { UserState, User } from "../../types/index";
import { getTime } from "../time/index";
const moment = require("moment");

export const checkIfUserExists = async (id: string) =>
  await (await db.collection("users").doc(id).get()).exists;

export const createUser = async (id: string) =>
  await db
    .collection("users")
    .doc(id)
    .set({ state: "creatingEntry" } as User);

export const getUserState = async (id: string) =>
  ((await db.collection("users").doc(id).get()).data() as User).state;

export const findEntryByDate = async (user: string, date: string) => {
  return db
    .collection("users")
    .doc(user)
    .collection("entries")
    .where("date", "==", date)
    .get();
};

export const getEntryById = async (user: string, id: string) => {
  return (
    await db.collection("users").doc(user).collection("entries").doc(id).get()
  ).data();
};

export const createEntry = async (user: string, entry: string) => {
  return db.collection("users").doc(user).collection("entries").add({
    date: getTime(),
    entry: entry,
    submitted: false,
  });
};

export const setUserState = async (user: string, state: UserState) => {
  return db.collection("users").doc(user).update({
    state,
  });
};
