import { types } from "mobx-state-tree";
import Color from "color";

import LocationIcon from "./util/LocationIcon";
import { getCoords } from "./util/SharedFunctions";
import MapLocationName from "./MapLocationName";
import Util from "../util/Util";

const MapLocation = types
  .model("MapLocation", {
    id: types.identifierNumber,
    name: types.string,
    names: types.optional(types.map(MapLocationName), {}),
    latitude: types.maybeNull(types.number),
    longitude: types.maybeNull(types.number),
    // using LocationIconType is too stringent; the model is outright rejected if the value is not known
    type: types.maybeNull(types.string),
    color: types.maybeNull(types.string)
  })
  .preProcessSnapshot(({ latitude, longitude, ...rest }) => ({
    ...rest,
    latitude: Util.parseCoordinateComponent(latitude),
    longitude: Util.parseCoordinateComponent(longitude)
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
