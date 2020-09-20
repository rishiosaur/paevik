import { db } from '../../../index'

export function createEntry(
	user: string,
	entry: any
): Promise<
	firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> {
	return db.collection('users').doc(user).collection('entries').add(entry)
}
