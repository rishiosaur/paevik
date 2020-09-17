import { db } from '../../index';

export const checkIfUserExists = async (id: string) => await (await db.collection("user").doc(id).get()).exists