import { journal_channel } from '../../../config';

export function welcomeBlocks(user_id: string): any[] {
    return [
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
                "text": "Great to see you here! *<https://github.com/rishiosaur/paevik|Paevik>* is a simple journalling bot for Slack. It looks like you're writing your first entry, so here's a summary of what entries mean and what you can do:"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `After you DM me your entry (right after you read this message, feel free to write one!), you can:\n• Post your entry to <#${journal_channel}> \n • Send the entry to your email *(coming soon)* \n • Find a journal entry by date *(coming soon)*`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Let's set that up after you write your first entry. Go ahead! I can't wait to see it :smile:"
            }
        }
    ];
}
