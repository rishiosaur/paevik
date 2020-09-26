import { app, db } from '../../../index'
import { File, Entry } from '../../../types/index'
import { currentDate } from '../../../shared/time/index'
import { postMessage, postEphemeralDMCurry } from '../../../shared/messages'

import { journal_channel, token, user_token } from '../../../config'

const getLinkFromFile = async (file: File) =>
	`${file.url_private}?pub_secret=${[
		...((
			await app.client.files.sharedPublicURL({
				file: file.id,
				token: user_token,
			})
		).file as File).permalink_public.split('-'),
	].pop()}`

export const postToJournal = async (user: string, id: string, entry: Entry) => {
	const ref = db.collection('users').doc(user).collection('entries').doc(id)

	const emoji = ['parrot_love', 'bellhop_bell', 'pencil', 'thinkspin']
	const random = emoji[Math.floor(Math.random() * emoji.length)]

	const imE = postEphemeralDMCurry(user)

	await imE(null, 'Sending to public now!')

	await ref.update({
		submitted: true,
	})

	const initialBlocks = [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `:${random}: New Journal entry from <@${user}> on ${currentDate()}:`,
			},
		},
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `> ${entry.entry}`,
			},
		},
	] as Array<any>

	const { display_name, image_1024 } = ((await app.client.users.profile.get({
		token,
		user,
	})) as any).profile

	let msg

	if (entry.files) {
		const fileBlocks = await Promise.all(
			entry.files
				.filter((file) => ['gif', 'jpeg', 'jpg', 'png'].includes(file.filetype))
				.map(async (file) => ({
					type: 'image',
					image_url: await getLinkFromFile(file),
					alt_text: file.name,
				}))
		)

		if (fileBlocks.length < 1) {
			await imE(
				null,
				"It doesn't look like your message contained any images. I've written your files to my database, but they won't be in the public message."
			)
			msg = postMessage(
				journal_channel,
				initialBlocks,
				`Entry ${id}`,
				image_1024,
				display_name
			)
		} else {
			const interimBlocks: any[] = [
				{
					type: 'divider',
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: `*Files:*`,
					},
				},
			]

			msg = postMessage(
				journal_channel,
				await [
					...initialBlocks,
					...interimBlocks,
					...(await Promise.all(fileBlocks)),
				],
				`Entry ${id}`,
				image_1024,
				display_name
			)
		}
	} else {
		msg = postMessage(
			journal_channel,
			initialBlocks,
			`Entry ${id}`,
			image_1024,
			display_name
		)
	}

	return msg
}
