import { findEntryById } from "./../entries/functions/findEntryById";
import { App } from "@slack/bolt";
import { formatting } from "../../shared/time/index";
import { stat } from "fs";
import { postEphemeralCurry } from "../../shared/messages/index";
import { Entry } from "../../types/index";
import { journal_channel, token } from "../../config";
import { findEntryByDate } from "../entries/functions/findEntryByDate";
import { onboard } from "../onboarding/functions/onboarding";
const moment = require("moment");

export type JournalCommand = "find" | "" | "create";
const commands = async (app: App) => {
  app.view("findEntry", async ({ ack, view, context, body, client }) => {
    await ack();
    const uid = body.user.id as string;
    const values = view.state.values;

    const imE = (blocks?: any[], text?: string) =>
      postEphemeralCurry(uid)(uid, blocks, text);

    const date = values.entryDate.value.selected_date || null;
    const id = values.entryId.value.value || null;
    console.log(values);

    console.log(date, id);

    const getPermalink = async (ts: string) =>
      (
        await client.chat.getPermalink({
          message_ts: ts,
          channel: journal_channel,
          token: token,
        })
      ).permalink;

    if (id) {
      const entry = (await findEntryById(uid, id)) as Entry;

      if (!entry)
        imE(
          null,
          `I'm sorry, <@${uid}>. I couldn't find any entry with ID ${id}. Please try a different query.`
        );
      imE([
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `:mag:  I've found an entry with id \`${id}\`!`,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Date:*\n${entry.date}`,
            },
            {
              type: "mrkdwn",
              text: `*By:*\n<@${uid}>`,
            },
            {
              type: "mrkdwn",
              text: `*Submitted to channel:* \n${
                entry.submitted ? "Yes" : "No"
              }`,
            },
            {
              type: "mrkdwn",
              text: `*Public Message:* \n${
                entry.submitted ? await getPermalink(entry.message) : "N/A"
              }`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `> ${entry.entry}`,
          },
        },
      ]);
    } else if (date) {
      const entriesProt = await findEntryByDate(uid, date);

      if (entriesProt.empty) {
        imE(
          null,
          `I'm sorry, <@${uid}>. I couldn't find any entry with date ${date}. Please try a different query.`
        );
      } else {
        const entries = entriesProt.docs.map((x) => x.data()) as Entry[];

        const entryBlocks = await Promise.all(
          entries.map(async (entry) => {
            return [
              {
                type: "divider",
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: `*Date:*\n${entry.date}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*By:*\n<@${uid}>`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Submitted to channel:* \n${
                      entry.submitted ? "Yes" : "No"
                    }`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Public Message:* \n${
                      entry.submitted
                        ? await getPermalink(entry.message)
                        : "N/A"
                    }`,
                  },
                ],
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `> ${entry.entry}`,
                },
              },
            ];
          })
        );

        imE([
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `:mag:  I found ${entries.length} ${
                entries.length > 1 ? "entries" : "entry"
              } from \`${date}\`!`,
            },
          },
          ...(await [].concat(...(await entryBlocks))),
        ]);
      }
    }
  });

  app.command(
    process.env.environment == "dev" ? "/journal-test" : "/journal",
    async ({ ack, body, client, context, command }) => {
      let { text } = command;

      const imE = (blocks?: any[], text?: string) =>
        postEphemeralCurry(body.user_id)(body.user_id, blocks, text);

      switch (text) {
        case "":
        case "query":
        case "search":
        case "find":
          await ack();
          await client.views.open({
            trigger_id: body.trigger_id,
            view: {
              type: "modal",
              title: {
                text: "Get",
                type: "plain_text",
              },
              callback_id: "findEntry",
              blocks: [
                {
                  type: "header",
                  text: {
                    type: "plain_text",
                    text: "Find a journal entry",
                  },
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "_By Date_",
                  },
                },
                {
                  type: "input",
                  element: {
                    type: "datepicker",
                    initial_date: moment().format(formatting),
                    placeholder: {
                      type: "plain_text",
                      text: "Select a date",
                      emoji: true,
                    },
                    action_id: "value",
                  },
                  label: {
                    type: "plain_text",
                    text: "Date",
                    emoji: true,
                  },
                  optional: true,
                  block_id: "entryDate",
                },
                {
                  type: "divider",
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "_By Id_",
                  },
                },
                {
                  type: "input",
                  block_id: "entryId",
                  label: {
                    type: "plain_text",
                    text: "What is your entry ID?",
                  },
                  element: {
                    type: "plain_text_input",
                    action_id: "value",
                    multiline: false,
                  },
                  optional: true,
                },
              ] as any[],
              submit: {
                text: "Submit",
                type: "plain_text",
              },
            },
          });
          break;
        case "new":
        case "create":
          await onboard(ack, body.user_id);
          break;
        default:
          await imE(
            [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text:
                    "Sorry, I didn't catch that. You can only run `/journal find` or `/journal new` using that slash command.",
                },
              },
            ],
            "Sorry, I didn't catch that."
          );
          break;
      }

      // }
    }
  );
};

export default commands;
