import { types } from 'mobx-state-tree';
import MapLocation from "../models/MapLocation";

const MapLocationStore = types.model('MapLocationStore', {
  mapLocations: types.array(MapLocation)
});

export default MapLocationStore;
