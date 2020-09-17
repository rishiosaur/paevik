import { App } from '@slack/bolt';
import { debug } from 'console';
import { filterNoBotMessages } from '../middleware/index';
import { postMessageCurry } from '../util/index';

const feature1 = async (app: App) => {
    app.command("/entry", async ({ body, context, ack }) => {
        await ack()

        const im = postMessageCurry(body.user_id)



    })
}
export default feature1;

/*
[
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Hi David :wave:"
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
				"text": "After you DM me your entry (right after you read this message, feel free to write one!), you can:\n• Post your entry to <#journal> \n • Send the entry to your email \n • Find a journal entry by date"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Let's set that up after you write your first entry. Go ahead! I can't wait to see it :smile:"
			}
		}
	]*/