import { app, db } from '../../../index'
import { File, Entry } from '../../../types/index'
import { currentDate } from '../../../shared/time/index'
import { postMessage } from '../../../shared/messages'

import { journal_channel, user_token } from '../../../config'

const getLinkFromFile = async (file: File) =>
	`${file.url_private}?pub_secret=${[
		...((
			await app.client.files.sharedPublicURL({
				file: file.id,
				token: user_token,
			})
		).file as File).permalink_public.split('-'),
	].pop()}`

export const postToJournal = async (
	user: string,
	value: string,
	id: string,
	userId: string,
	entry: Entry
) => {
	const ref = db.collection('users').doc(userId).collection('entries').doc(id)

	const emoji = ['parrot_love', 'bellhop_bell', 'pencil', 'thinkspin']
	const random = emoji[Math.floor(Math.random() * emoji.length)]

	await ref.update({
		submitted: true,
	})

	const initialBlocks = [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `:${random}: New Journal entry from ${user} on ${currentDate()}:`,
			},
		},
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `> ${value}`,
			},
		},
	] as Array<any>

	const fileBlocks: Array<any> = await entry.files?.map(async (file) => ({
		type: 'image',
		image_url: await getLinkFromFile(file),
		alt_text: file.name,
		title: file.title,
	}))

	return postMessage(
		journal_channel,
		await [...initialBlocks, ...(await Promise.all(fileBlocks))]
	)
}
