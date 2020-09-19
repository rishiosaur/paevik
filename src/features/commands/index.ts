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
