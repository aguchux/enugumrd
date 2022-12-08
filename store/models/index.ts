import { Models } from "@rematch/core";
import { communities } from "./communities";
import { config } from "./config";

export interface RootModel extends Models<RootModel> {
  communities: typeof communities;
  config: typeof config;
}

export const models: RootModel = {
  communities,
  config,
};
