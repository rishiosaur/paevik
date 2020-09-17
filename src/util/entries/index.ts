import { postMessage } from "..";
import { db } from "../../index";
import { Entry } from "../../types/index";

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
    await postMessage("C0P5NE354", [
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
