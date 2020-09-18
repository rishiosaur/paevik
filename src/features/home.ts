import { App } from "@slack/bolt";
const home = async (app: App) => {
    app.event('app_home_opened', async ({ event, client }) => {
        try {
          // Call views.publish with the built-in client
          const result = await client.views.publish({
            // Use the user ID associated with the event
            user_id: event.user,
            view: {
              // Home tabs must be enabled in your app configuration page under "App Home"
              "type": "home",
              "blocks": ([
                {
                    "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": `<@${event.user}>'s Journal :book: :sparkles:`
                    }
                  },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>."
                  }
                }
              ] as any)
            }
          });
      
          console.log(result);
        }
        catch (error) {
          console.error(error);
        }
      });
};

export default home;
