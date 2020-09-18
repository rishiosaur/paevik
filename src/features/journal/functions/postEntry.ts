import { journal_channel } from "../../../config";
import { ButtonAction, SlackAction, App } from "@slack/bolt";
import { postToJournal } from "./postToJournal";
import { getEntryById } from "../../entries/functions/getEntryById";
import { Entry } from "../../../types/index";
import { postMessageCurry } from "../../../shared/messages/index";
import { app } from "../../../index";

export async function postEntry(ack, action, body: SlackAction, name: string) {
  await ack();

  const act = action as ButtonAction & {
    value: string;
  };

  console.log((body as any).message.ts);
  const id = act.value;

  const user = body.user.id;
  const { entry, submitted } = (await getEntryById(user, id)) as Entry;

  const im = postMessageCurry(user);

  if (submitted) {
    im(null, "You've already submitted that message, sorry.");
  }
  await im([
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `I've sent your message to <#${journal_channel}>.\n\nThanks for creating an entry (id: ${id}) today! Feel free to come back anytime, <@${user}> :D`,
      },
    },
  ]);
  
  return postToJournal(name, entry, id, user);
}
