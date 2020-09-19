import { AppHomeOpenedEvent } from "@slack/bolt";
import { homeViewBlocks } from "../blocks/homeViewBlocks";

export function generateBaseHomeView(event: AppHomeOpenedEvent) {
  return {
    type: "home",
    blocks: homeViewBlocks(event),
  };
}
