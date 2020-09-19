import { db } from "../../../index";
import { Entry } from '../../../types/index';
import { currentDate } from '../../../shared/time/index';


export function createEntry(user: string, entry: Entry) {
  return db
    .collection("users")
    .doc(user)
    .collection("entries")
    .add(entry);
}
