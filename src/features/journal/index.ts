import { App } from "@slack/bolt";
import { postMessageCurry } from "../../shared/messages/index";
import { postEntry } from "./functions/postEntry";
import { updatePostEntryMessage } from './functions/updatePostEntryMessage';
import { db } from '../../index';
const journal = async (app: App) => {
  app.action("postEntry", async ({ ack, context, body, action }) => {
    const x = await postEntry(ack, action, body, `<@${body.user.id}>`);
    console.log(x)
    await updatePostEntryMessage((body as any).message.ts, (body as any).container.channel_id, true)

    // await db.collection("users").doc(body.user.id).collection("entries").doc((action as any).value).update({
    //   message: x.message.ts
    // })
  });

  app.action("postEntryAnonymously", async ({ ack, context, body, action }) => {
    await postEntry(ack, action, body, `*Anonymous*`);

    await updatePostEntryMessage((body as any).message.ts, (body as any).container.channel_id, false)
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

    await updatePostEntryMessage((body as any).message.ts, (body as any).container.channel_id, false)
    
  });
};

export default journal;


