import { App } from '@slack/bolt'
import { findEntryById } from '../entries/functions/findEntryById'
import { postEphemeralCurry } from '../../shared/messages/index'
import { Entry } from '../../types/index'
import { findEntryByDate } from '../entries/functions/findEntryByDate'
import { onboard } from '../onboarding/functions/onboarding'
import { findEntry } from './functions/findEntry'
import { createEntryBlocks } from './functions/createEntryBlocks'

export type JournalCommand = 'find' | '' | 'create'
const commands = async (app: App) => {
	app.action('searchJournal', async ({ ack, body }) =>
		findEntry(ack, (body as any).trigger_id)
	)
	app.view('findEntry', async ({ ack, view, body }) => {
		await ack()
		const uid = body.user.id as string
		const { values } = view.state

		const imE = (blocks?: any[], text?: string) =>
			postEphemeralCurry(uid)(uid, blocks, text)

		const date = values.entryDate.value.selected_date || null
		const id = values.entryId.value.value || null

		if (id) {
			const entry = (await findEntryById(uid, id)) as Entry

			if (!entry)
				imE(
					null,
					`I'm sorry, <@${uid}>. I couldn't find any entry with ID ${id}. Please try a different query.`
				)
			imE(await createEntryBlocks(entry, uid))
		} else if (date) {
			const entriesProt = await findEntryByDate(uid, date)

			if (entriesProt.empty) {
				imE(
					null,
					`I'm sorry, <@${uid}>. I couldn't find any entry with date ${date}. Please try a different query.`
				)
			} else {
				const entries = entriesProt.docs.map((x) => x.data()) as Entry[]

				const entryBlocks = await Promise.all(
					entries.map(async (entry) => createEntryBlocks(entry, uid))
				)

				imE([
					{
						type: 'section',
						text: {
							type: 'mrkdwn',
							text: `:mag:  I found ${entries.length} ${
								entries.length > 1 ? 'entries' : 'entry'
							} from \`${date}\`!`,
						},
					},
					...(await [].concat(...(await entryBlocks))),
				])
			}
		}
	})

	app.command(
		process.env.environment === 'dev' ? '/journal-test' : '/journal',
		async ({ ack, body, command }) => {
			const { text } = command

			const imE = (blocks?: any[], text?: string) =>
				postEphemeralCurry(body.user_id)(body.user_id, blocks, text)

			switch (text) {
				case '':
				case 'query':
				case 'search':
				case 'find':
					await findEntry(ack, body.trigger_id)
					break
				case 'new':
				case 'create':
					await onboard(ack, body.user_id)
					break
				default:
					await imE(
						[
							{
								type: 'section',
								text: {
									type: 'mrkdwn',
									text:
										"Sorry, I didn't catch that. You can only run `/journal find` or `/journal new` using that slash command.",
								},
							},
						],
						"Sorry, I didn't catch that."
					)
					break
			}
		}
	)
}

export default commands
