import { types } from "mobx-state-tree";
import { getCoords } from "./util/SharedFunctions";

const MapPointVisit = types
  .model("MapPointVisit", {
    latitude: types.number,
    longitude: types.number,
    timestamp: types.string
  })
  .views((self) => ({
    get coords() {
      return getCoords(self);
    }
  }));

export default MapPointVisit;
