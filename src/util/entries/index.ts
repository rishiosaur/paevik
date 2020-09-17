import { postMessage } from "..";
import { db } from "../../index";
import { Entry } from "../../types/index";
import { journal_channel } from '../../config';

export const postToJournal = async (
  user: string,
  value: string,
  id: string,
  userId: string
) => {
  const ref = db.collection("users").doc(userId).collection("entries").doc(id);

  const entry = await (await ref.get()).data();

  if (entry.submitted) {
  } else {
    await postMessage(journal_channel, [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:pencil: New Journal entry from ${user}:`,
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
    await ref.update({
      submitted: true,
    });
  }
};
