import { types } from "mobx-state-tree";
import MapCoordinates from "./MapCoordinates";

const MapPointVisit = types.model("MapPointVisit", {
  coords: MapCoordinates,
  timestamp: types.string
});

export default MapPointVisit;
