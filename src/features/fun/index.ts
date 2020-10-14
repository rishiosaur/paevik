import { App } from '@slack/bolt'
import { postEphemeralCurry } from '../../shared/messages/index'
import { db } from '../../index'
const funStuff = async (app: App) => {
	app.command(
		process.env.environment === 'dev'
			? '/stateofjournalling-test'
			: '/stateofjournalling',
		async ({ ack, command, body }) => {
			await ack()

			const sendEph = postEphemeralCurry(command.channel_id)
			const users = await db.collection('users').get()

			const userSize = users.size

			let entries = 0

			users.forEach(async (snap) => {
				const entriesRef = await snap.ref.collection('entries').get()
				entries += entriesRef.size
				console.log(entries)
				console.log(entriesRef.size)
			})

			console.log(userSize)
			console.log(entries)
		}
	)
}

export default funStuff
