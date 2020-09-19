import { AckFn } from '@slack/bolt'
import {
	postMessageCurry,
	postEphemeralDMCurry,
} from '../../../shared/messages/index'
import {
	checkIfUserExists,
	createUser,
	setUserState,
	getUserState,
} from '../../../shared/db/index'
import { welcomeBlocks } from '../blocks/welcomeBlocks'
import { returningBlocks } from '../blocks/returningBlocks'

export const onboard = async (ack: AckFn<any>, user_id: string) => {
	await ack()

	const im = postMessageCurry(user_id)
	const ephemeralDm = postEphemeralDMCurry(user_id)
	const exists = await checkIfUserExists(user_id)

	if (!exists) {
		await im(
			welcomeBlocks(user_id),
			'Welcome to Paevik, the journalling bot for Slack!'
		)

		await createUser(user_id)
	} else if ((await getUserState(user_id)) === 'creatingEntry') {
		await ephemeralDm(
			undefined,
			"Looks like you're still in the process of writing another entry. Let's finish that one before making a new one, shall we? ;P"
		)
	} else {
		im(returningBlocks(user_id), 'Welcome back to Paevik!')
		setUserState(user_id, 'creatingEntry')
	}
}
