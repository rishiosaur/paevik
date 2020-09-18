import { App } from "@slack/bolt";
import { baseHomeView } from "./util";
const home = async (app: App) => {
  app.event("app_home_opened", async ({ event, client }) => {
    try {
      // Call views.publish with the built-in client
      const result = await client.views.publish({
        // Use the user ID associated with the event
        user_id: event.user,
        view: baseHomeView(event) as any,
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
};

export default home;


