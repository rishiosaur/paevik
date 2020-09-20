import { getPermalinkFromJournalChannel } from '../../../shared/messages/index'
import { Entry } from '../../../types/index'

export async function createEntryBlocks(
	entry: Entry,
	uid: string
	// getPerm .alink: . (ts: string) => Promise<unknown>
): Promise<Array<unknown>> {
	return [
		{
			type: 'divider',
		},
		{
			type: 'section',
			fields: [
				{
					type: 'mrkdwn',
					text: `*Date:*\n${entry.date}`,
				},
				{
					type: 'mrkdwn',
					text: `*By:*\n<@${uid}>`,
				},
				{
					type: 'mrkdwn',
					text: `*Submitted to channel:* \n${entry.submitted ? 'Yes' : 'No'}`,
				},
				{
					type: 'mrkdwn',
					text: `*Public Message:* \n${
						entry.submitted
							? await getPermalinkFromJournalChannel(entry.message)
							: 'N/A'
					}`,
				},
			],
		},
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `> ${entry.entry}`,
			},
		},
	]
}
