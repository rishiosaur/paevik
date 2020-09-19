import { App, ButtonAction } from '@slack/bolt'
import { onboard } from './functions/onboarding'

const onboarding = async (app: App) => {
	app.command(
		process.env.environment === 'dev' ? '/entry-test' : '/entry',
		async ({ body, ack }) => {
			await onboard(ack, body.user_id)
		}
	)

	app.action('startEntry', async ({ action, ack }) => {
		const { value } = action as ButtonAction & { value: string }

		await onboard(ack, value)
	})

	app.shortcut('startEntry', async ({ shortcut, ack }) => {
		await onboard(ack, shortcut.user.id)
	})
}

export default onboarding
