import { Entry } from '../../../types/index'

export async function createEntryBlocks(
	entry: Entry,
	uid: string,
	getPermalink: (ts: string) => Promise<unknown>
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
						entry.submitted ? await getPermalink(entry.message) : 'N/A'
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
