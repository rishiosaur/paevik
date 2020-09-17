import { journal_channel } from "./../config";
import { App } from "@slack/bolt";
import { stat } from "fs";
import {
  filterDM,
  filterChannelType,
  filterNoBotMessages,
} from "../middleware/index";
import { getUserState, createEntry, setUserState } from "../util/db/index";
import { postMessageCurry } from "../util/index";
import { getTime } from "../util/time/index";

const messaging = async (app: App) => {
  app.message(
    filterChannelType("im"),
    filterNoBotMessages,
    async ({ message, body, say }) => {
      const { user, text } = message;
      const state = await getUserState(user);

      const im = postMessageCurry(user);

      if (state === "creatingEntry") {
        const { id } = await createEntry(user, text);

        await im([
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `That's an awesome entry, <@${user}>! Thanks for writing. Do you want to publicly share it to the <#${journal_channel}> channel for others to comment on? I've written it to my database as part of *${getTime()}*'s entries.`,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  emoji: true,
                  text: "Yep!",
                },
                style: "primary",
                value: id,
                action_id: "postEntry",
              },
              {
                type: "button",
                text: {
                  type: "plain_text",
                  emoji: true,
                  text: "No thanks.",
                },
                style: "danger",
                value: id,
                action_id: "noPost",
              },
              {
                type: "button",
                text: {
                  type: "plain_text",
                  emoji: true,
                  text: "Send anonymously",
                },
                value: id,
                action_id: "postEntryAnonymously",
              },
            ],
          },
        ]);
        await setUserState(user, "submitted");
      } else {
        say(
          "I'm not sure I understand. If you want to create an entry, run `/entry`!"
        );
      }
    }
  );
};

export default messaging;
