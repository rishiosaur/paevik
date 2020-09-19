import { currentDate } from '../../../shared/time/index';
import { AckFn, SlashCommand } from "@slack/bolt"
import { postMessageCurry } from '../../../shared/messages/index';
import { checkIfUserExists, createUser, setUserState } from '../../../shared/db/index';
import { welcomeBlocks } from '../blocks/welcomeBlocks';
import { returningBlocks } from '../blocks/returningBlocks';

export const onboard = async (ack: AckFn<any>, user_id: string ) => {
    await ack()

    const im = postMessageCurry(user_id)
    const exists = await checkIfUserExists(user_id)

    if (!exists) {
        await im(welcomeBlocks(user_id), "Welcome to Paevik, the journalling bot for Slack!")

        await createUser(user_id)
    } else {
        im(returningBlocks(user_id), "Welcome back to Paevik!")
        setUserState(user_id, "creatingEntry")
    }
}


