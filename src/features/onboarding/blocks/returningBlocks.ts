import { getTime } from '../../../shared/time/index';

export const returningBlocks = (user_id: string) => {
    return [
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
    ];
}
