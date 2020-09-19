import { journal_channel } from '../../config';
import { currentDate } from '../../shared/time';
import { App, ButtonAction } from '@slack/bolt';
import { debug } from 'console';
import { filterNoBotMessages } from '../../middleware';
import { postMessageCurry } from '../../shared/messages';
import { setUserState, createUser, checkIfUserExists } from '../../shared/db';
import { onboard } from './functions/onboarding';

const onboarding = async (app: App) => {
    app.command(process.env.environment == "dev" ? "/entry-test" : "/entry", async ({ body, context, ack }) => {
        await onboard(ack, body.user_id)
    })

    app.action("startEntry", async ({ action, body, ack }) => {
        const { value } = action as ButtonAction & { value: string }

        await onboard(ack, value)
    })

    app.shortcut("startEntry", async({ shortcut, ack }) => {
        await onboard(ack, shortcut.user.id)
    })
    
}

export default onboarding;