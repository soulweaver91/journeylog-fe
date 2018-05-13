import { types } from "mobx-state-tree";
import Color from "color";

import LocationIcon from "./util/LocationIcon";
import { associatePairs, getCoords } from "./util/SharedFunctions";

const MapLocation = types
  .model("MapLocation", {
    id: types.identifier(types.number),
    name: types.string,
    otherNames: types.optional(types.map(types.string), {}),
    latitude: types.number,
    longitude: types.number,
    // using LocationIconType is too stringent; the model is outright rejected if the value is not known
    type: types.maybe(types.string),
    color: types.maybe(types.string)
  })
  .preProcessSnapshot(({ other_names, ...rest }) => ({
    ...rest,
    otherNames: rest.otherNames || associatePairs(other_names, "lang", "name")
  }))
  .views((self) => ({
    get icon() {
      return self.type && LocationIcon[self.type]
        ? LocationIcon[self.type]
        : null;
    },
    get backgroundColor() {
      return self.color
        ? Color("#" + self.color)
            .lighten(0.5)
            .desaturate(0.25)
            .string()
        : undefined;
    },
    get accentColor() {
      return self.color
        ? Color("#" + self.color)
            .desaturate(0.25)
            .string()
        : undefined;
    },
    get coords() {
      return getCoords(self);
    }
  }));

export default MapLocation;
