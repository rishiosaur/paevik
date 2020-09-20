import { App } from '@slack/bolt'
import { generateBaseHomeView } from './functions/generateBaseHomeView'
import { getLastEntries } from '../entries/functions/getLastEntries'
const home = async (app: App) => {
	app.event('app_home_opened', async ({ event, client }) => {
		try {
			// Call views.publish with the built-in client
			console.log(await getLastEntries(event.user))
			const result = await client.views.publish({
				// Use the user ID associated with the event
				user_id: event.user,
				view: (await generateBaseHomeView(event)) as any,
			})

			console.log(result)
		} catch (error) {
			console.error(error)
		}
	})
}

export default home
