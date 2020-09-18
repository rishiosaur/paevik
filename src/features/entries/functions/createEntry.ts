import { db } from "../../../index";
import { Entry } from '../../../types/index';
import { getTime } from '../../../shared/time/index';


export function createEntry(user: string, entry: string) {
  return db
    .collection("users")
    .doc(user)
    .collection("entries")
    .add({
      date: getTime(),
      entry: entry,
      submitted: false,
    } as Entry);
}
