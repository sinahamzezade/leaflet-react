import { Models } from "@rematch/core";
import map from "./map";

export interface RootModel extends Models<RootModel> {
  map: typeof map;
}

export const models: RootModel = {
  map,
};
