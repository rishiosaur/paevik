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
	const entry = (await findEntryById(user, id)) as Entry

	const im = postMessageCurry(user)

	if (entry.submitted) {
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

	return postToJournal(user, entry.entry, id, user, entry)
}
