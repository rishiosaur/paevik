import { journal_channel, token } from "../../../config";
import { app } from "../../../index";
export const updatePostEntryMessage = async (ts: string, channel: string, submitted: boolean) => {
   return await app.client.chat.update({
    ts: ts,
    blocks: submitted
      ? [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `:white_check_mark: Entry posted to <#${journal_channel}>!`,
            },
          },
        ]
      : [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `:negative_squared_cross_mark: Entry kept private.`,
            },
          },
        ],
        channel,
        text: submitted ? "Submitted to public channel" : "Entry kept private",
        token
  });
};
