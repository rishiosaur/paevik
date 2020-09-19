import { AppHomeOpenedEvent } from '@slack/bolt'

export function homeViewBlocks(event: AppHomeOpenedEvent) {
	return [
		{
			type: 'header',
			text: {
				type: 'plain_text',
				text: 'The journal!',
				emoji: true,
			},
		},
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `Welcome, <@${event.user}>! :sparkles: :book: :pen:—This is where you'll find all of your journal-related things. DM <@UHFEGV147> if you need some help.\n`,
			},
		},
		{
			type: 'context',
			elements: [
				{
					type: 'mrkdwn',
					text:
						':pencil: Manually start an entry with `/entry `\n :scrappy: Add a journal entry to Scrapbook with `/scrapbook <id>`',
				},
			],
		},
		{
			type: 'divider',
		},
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `*Basic Actions*`,
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
						text: ':pencil: Start a journal entry',
					},

					value: event.user,
					action_id: 'startEntry',
				},
				{
					type: 'button',
					text: {
						type: 'plain_text',
						emoji: true,
						text: ':mag: Search through your journal',
					},
					value: event.user,
					action_id: 'searchJournal',
				},
			],
		},
	]
}
