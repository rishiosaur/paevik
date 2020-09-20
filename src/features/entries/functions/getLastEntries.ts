import { db } from '../../../index'
import { Entry } from '../../../types/index'
export const getLastEntries = async (user: string): Promise<Entry[]> => {
	const coll = (
		await db
			.collection('users')
			.doc(user)
			.collection('entries')
			.orderBy('timestamp', 'desc')
			.limit(5)
			.get()
	).docs.map((doc) => doc.data())

	return coll as Entry[]
}
