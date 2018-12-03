import { types } from "mobx-state-tree";
import MapLocation from "./MapLocation";

const MapLocationVisit = types.model("MapLocationVisit", {
  id: types.number,
  location: types.reference(MapLocation),
  timestamp: types.string
});

export default MapLocationVisit;
