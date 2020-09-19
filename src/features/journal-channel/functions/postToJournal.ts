import { currentDate } from '../../../shared/time/index';
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

  const entry = await (await ref.get()).data() as Entry;

  const emoji = [ "parrot_love",  "bellhop_bell",  "pencil",  "thinkspin"]
  const random = emoji[Math.floor(Math.random() * emoji.length)]

  // console.log((["hello"] as Array<any>))

  if (entry.submitted) {
    
  }
  
  
  // console.log(([
  //   {
  //     type: "section",
  //     text: {
  //       type: "mrkdwn",
  //       text: `:${random}: New Journal entry from ${user} on ${getTime()}:`,
  //     },
  //   },
  //   {
  //     type: "section",
  //     text: {
  //       type: "mrkdwn",
  //       text: `> ${value}`,
  //     },
  //   },
  // ] as Array<any>).concat(entry.files.map(val => ({
  //   "type": "image",
  //   "title": {
  //     "type": "plain_text",
  //     "text": val.title,
  //     "emoji": true
  //   },
  //   "image_url": val.url_private,
  //   "alt_text": val.title
  // }))))
    const exit = await postMessage(journal_channel, ([
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:${random}: New Journal entry from ${user} on ${currentDate()}:`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `> ${value}`,
        },
      },
    ] as Array<any>));

    console.log(exit)

    await ref.update({
      submitted: true,
    });

    return exit
};
