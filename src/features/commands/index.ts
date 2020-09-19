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
};

export default commands;
