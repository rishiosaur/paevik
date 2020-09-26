import { ButtonAction, SlackAction } from '@slack/bolt'
import { Entry } from '../../../types/index'
import { journal_channel, token } from '../../../config'
import { postToJournal } from './postToJournal'

import {
	postMessageCurry,
	getPermalinkFromJournalChannel,
} from '../../../shared/messages/index'
import { findEntryById } from '../../entries/functions/findEntryById'
import { app } from '../../../index'

export async function postEntry(ack, action, body: SlackAction) {
	await ack()

	const act = action as ButtonAction & {
		value: string
	}

	console.log(body)
	const id = act.value

	const user = body.user.id
	const entry = (await findEntryById(user, id)) as Entry

	const im = postMessageCurry(user)

	const journalPost = await postToJournal(user, id, entry)

	if (entry.submitted) {
		im(null, "You've already submitted that message, sorry.")
	}

	await im([
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `I've sent your message to <#${journal_channel}>. You can find it <${await getPermalinkFromJournalChannel(
					journalPost.ts
				)}|here>.\n\nThanks for creating an entry (id: \`${id}\`) today! Feel free to come back anytime, <@${user}> :D`,
			},
		},
	])

	return journalPost
}
