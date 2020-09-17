import { journal_channel } from "./../config";
import { App, ButtonAction } from "@slack/bolt";
import { postToJournal } from "../util/entries/index";
import { getEntryById } from "../util/db/index";
import { Entry } from "../types/index";
import { postMessageCurry } from "../util/index";
const journal = async (app: App) => {
  app.action("postEntry", async ({ ack, context, body, action }) => {
    await ack();

    const act = action as ButtonAction & {
      value: string;
    };

    // console.log(context)

    const id = act.value;

    console.log(act.value);
    const user = body.user.id;
    const { entry, submitted } = (await getEntryById(user, id)) as Entry;

    const im = postMessageCurry(user);

    console.log(submitted);
    // console.log(entry)

    if (submitted) {
      im(null, "You've already submitted that message, sorry.");
    } else {
      await postToJournal(`<@${user}>`, entry, id, user);
      await im([
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `I've sent your message to <#${journal_channel}>.\n\nThanks for creating an entry (id: ${id}) today! Feel free to come back anytime, <@${user}> :D`,
          },
        },
      ]);
    }
  });

  app.action("postEntryAnonymously", async ({ ack, context, body, action }) => {
    await ack();

    const act = action as ButtonAction & {
      value: string;
    };

    // console.log(context)

    const id = act.value;

    const user = body.user.id;
    const { entry, submitted } = (await getEntryById(user, id)) as Entry;

    // console.log(entry)

    await postToJournal(`*Anonymous*`, entry, id, user);

    const im = postMessageCurry(user);

    if (submitted) {
      im(null, "You've already submitted that message, sorry.");
    } else {
      await postToJournal(`Anonymous`, entry, id, user);

      await im([
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `I've sent your message to <#${journal_channel}>.\n\nThanks for creating an entry (id: ${id}) today! Feel free to come back anytime, <@${user}> :D`,
          },
        },
      ]);
    }
  });

  app.action("noPost", async ({ ack, context, body, action }) => {
    await ack();

    const user = body.user.id;

    const im = postMessageCurry(user);

    await im([
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `That's alright. Thanks for creating an entry today! Feel free to come back anytime, <@${user}> :D`,
        },
      },
    ]);
  });
};

export default journal;
