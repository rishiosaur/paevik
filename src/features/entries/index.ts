import { App } from '@slack/bolt'
import { filterChannelType, filterNoBotMessages } from '../../middleware/index'
import { getUserState, setUserState } from '../../shared/db/index'
import { createEntry } from './functions/createEntry'
import { postMessageCurry } from '../../shared/messages/index'
import { createEntryBlocks } from './blocks/createEntryBlocks'
import { currentDate } from '../../shared/time/index'

const messaging = async (app: App) => {
	app.message(
		filterChannelType('im'),
		filterNoBotMessages,
		async ({ message, say }) => {
			const { user, text, files } = message

			const state = await getUserState(user)

			const im = postMessageCurry(user)

			const entryFiles = files || null

			console.log(files)

			if (state === 'creatingEntry') {
				const { id } = await createEntry(user, {
					entry: text,
					date: currentDate(),
					submitted: false,
					files: entryFiles,
				})

				await im(createEntryBlocks(user, id))
				await setUserState(user, 'submitted')
			} else {
				say(
					"I'm not sure I understand. If you want to create an entry, run `/entry`!"
				)
			}
		}
	)
}

export default messaging
