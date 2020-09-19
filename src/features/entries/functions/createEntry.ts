import { db } from '../../../index'
import { Entry } from '../../../types/index'

export function createEntry(
	user: string,
	entry: Entry
): Promise<
	firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> {
	return db.collection('users').doc(user).collection('entries').add(entry)
}
