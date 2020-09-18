import { db } from "../../../index";
import { Entry } from '../../../types/index';


export const getEntryById = async (user: string, id: string) => {
    return (await db.collection("users").doc(user).collection("entries").doc(id).get()).data() as Entry;
}
