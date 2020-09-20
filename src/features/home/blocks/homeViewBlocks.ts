import { AppHomeOpenedEvent } from '@slack/bolt'
import { createEntryBlocks } from '../../commands/functions/createEntryBlocks'
import { getLastEntries } from '../../entries/functions/getLastEntries'

export async function homeViewBlocks(event: AppHomeOpenedEvent) {
	const entries = await getLastEntries(event.user)
	const headerBlocks = [
		{
			type: 'header',
			text: {
				type: 'plain_text',
				text: 'The journal!',
				emoji: true,
			},
		},
		{
			type: 'context',
			elements: [
				{
					type: 'mrkdwn',
					text: `Welcome, <@${event.user}>! :sparkles: :book: —This is where you'll find all of your journal-related things. DM <@UHFEGV147> if you need some help.\n`,
				},
			],
		},
		{
			type: 'divider',
		},
		{
			type: 'header',
			text: {
				type: 'plain_text',
				text: ':building_construction: Basic Actions',
				emoji: true,
			},
		},
		{
			type: 'context',
			elements: [
				{
					type: 'mrkdwn',
					text: 'Shortcuts for doing stuff quickly :p',
				},
			],
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

	const entryBlocks = await Promise.all(
		entries.map((entry) => createEntryBlocks(entry, event.user))
	)

	console.log(entryBlocks)

	return [
		...headerBlocks,
		{
			type: 'divider',
		},
		{
			type: 'header',
			text: {
				type: 'plain_text',
				text: ':pencil: Latest entries',
				emoji: true,
			},
		},
		{
			type: 'context',
			elements: [
				{
					type: 'mrkdwn',
					text: 'Here are your latest *5* entries, ordered by timestamp.',
				},
			],
		},
		...(await [].concat(...(await entryBlocks))),
	]
}
