import { types } from 'mobx-state-tree';
import MapCoordinates from "./MapCoordinates";

const MapLocation = types.model('MapLocation', {
  id: types.identifier(types.number),
  name: types.string,
  coords: MapCoordinates
});

export default MapLocation;
