import { types } from 'mobx-state-tree';
import MapLocation from "../models/MapLocation";

const MapLocationStore = types.model('MapLocationStore', {
  mapLocations: types.array(MapLocation)
}).actions((self) => ({
  loadLocations: (locations) => self.mapLocations = locations
}));

export default MapLocationStore;
