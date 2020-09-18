import { AppHomeOpenedEvent } from "@slack/bolt";
import { homeViewBlocks } from "./blocks/homeViewBlocks";

export function baseHomeView(event: AppHomeOpenedEvent) {
  return {
    type: "home",
    blocks: homeViewBlocks(event),
  };
}
