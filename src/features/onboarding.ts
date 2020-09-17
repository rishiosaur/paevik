import { journal_channel } from './../config';
import { getTime } from '../util/time/index';
import { App } from '@slack/bolt';
import { debug } from 'console';
import { filterNoBotMessages } from '../middleware/index';
import { postMessageCurry } from '../util/index';
import { setUserState, createUser, checkIfUserExists } from '../util/db/index';

const onboarding = async (app: App) => {
    app.command("/entry", async ({ body, context, ack }) => {
        await ack()

        const { user_id } = body
        const im = postMessageCurry(user_id)
        const exists = await checkIfUserExists(user_id)

        if (!exists) {
            await im([
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Hi <@${user_id}>! :parrot: :wave:`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Great to see you here! Paevik is a simple journalling bot for Slack. It looks like you're writing your first entry, so here's a summary of what entries mean and what you can do:"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `After you DM me your entry (right after you read this message, feel free to write one!), you can:\n• Post your entry to <#${journal_channel}> \n • Send the entry to your email \n • Find a journal entry by date`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Let's set that up after you write your first entry. Go ahead! I can't wait to see it :smile:"
                    }
                }
            ])
    
            await createUser(user_id)
            await setUserState(user_id, "creatingEntry")
        } else {
            im([
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Hi <@${user_id}> :wave:`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Welcome back to Paevik. Let's get you started with a new journal entry for *${getTime()}*! Type away, I can't wait to see your entry!`
                    }
                }
            ])
            setUserState(user_id, "creatingEntry")
        }

    })
}
export default onboarding;

/*
*/