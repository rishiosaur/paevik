import { db } from "../../../index";


export const findEntryByDate = async (user: string, date: string) => {
  return db
    .collection("users")
    .doc(user)
    .collection("entries")
    .where("date", "==", date)
    .get();
};


