import { getTime } from '../../../shared/time/index';
import { postMessage } from "../../../shared/messages";
import { db } from "../../../index";
import { Entry } from "../../../types/index";
import { journal_channel } from '../../../config';

export const postToJournal = async (
  user: string,
  value: string,
  id: string,
  userId: string
) => {
  const ref = db.collection("users").doc(userId).collection("entries").doc(id);

  const entry = await (await ref.get()).data();

  const emoji = [ "parrot_love",  "bellhop_bell",  "pencil",  "thinkspin"]
  const random = emoji[Math.floor(Math.random() * emoji.length)]

  if (entry.submitted) {
    
  }
  
  await ref.update({
    submitted: true,
  });
    return postMessage(journal_channel, [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:${random}: New Journal entry from ${user} on ${getTime()}:`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `> ${value}`,
        },
      },
    ]);
    
  
};
