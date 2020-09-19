import { journal_channel } from '../../../config'
import { currentDate } from '../../../shared/time/index'

export function createEntryBlocks(user: string, id: string): any[] {
	return [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `That's an awesome entry, <@${user}>! Thanks for writing. Do you want to publicly share it to the <#${journal_channel}> channel for others to comment on? I've written it to my database as part of *${currentDate()}*'s entries.`,
			},
		},
		{
			type: 'actions',
			elements: [
				{
					type: 'button',
					text: {
						type: 'plain_text',
						emoji: true,
						text: 'Yep!',
					},
					style: 'primary',
					value: id,
					action_id: 'postEntry',
				},
				{
					type: 'button',
					text: {
						type: 'plain_text',
						emoji: true,
						text: 'No thanks.',
					},
					style: 'danger',
					value: id,
					action_id: 'noPost',
				},
			],
		},
	]
}
