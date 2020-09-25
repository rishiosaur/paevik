import { ButtonAction, SlackAction } from '@slack/bolt'
import { File, Entry } from '../../../types/index'
import { journal_channel, user_token } from '../../../config'
import { postToJournal } from './postToJournal'

import { postMessageCurry } from '../../../shared/messages/index'
import { findEntryById } from '../../entries/functions/findEntryById'
import { app } from '../../../index'

export async function postEntry(ack, action, body: SlackAction, name: string) {
	await ack()

	const act = action as ButtonAction & {
		value: string
	}

	console.log((body as any).message.ts)
	const id = act.value

	const user = body.user.id
	const { entry, submitted, files } = (await findEntryById(user, id)) as Entry

	console.log(files)

	console.log(
		`${files[0].url_private}?pub_secret=${[
			...((
				await app.client.files.sharedPublicURL({
					file: files[0].id,
					token: user_token,
				})
			).file as File).permalink_public.split('-'),
		].pop()}`
	)

	const im = postMessageCurry(user)

	if (submitted) {
		im(null, "You've already submitted that message, sorry.")
	}
	await im([
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `I've sent your message to <#${journal_channel}>.\n\nThanks for creating an entry (id: ${id}) today! Feel free to come back anytime, <@${user}> :D`,
			},
		},
	])

	return postToJournal(name, entry, id, user)
}
