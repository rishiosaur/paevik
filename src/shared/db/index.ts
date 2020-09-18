// import moment from "moment";
import { db } from "../../index";
import { UserState, User } from '../../types/index';
const moment = require("moment")

export const checkIfUserExists = async (id: string) =>
  await (await db.collection("users").doc(id).get()).exists;

  export const createUser = async (id: string) => await db.collection("users").doc(id).set({ state: "creatingEntry" } as User)

export const getUserState = async (id: string) => ((await db.collection("users").doc(id).get()).data() as User).state

export const setUserState = async (user: string, state: UserState) => {
    return db.collection("users").doc(user).update({
        state
    })
}