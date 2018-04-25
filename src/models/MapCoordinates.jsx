import { types } from 'mobx-state-tree';

const MapCoordinates = types.model('MapCoordinates', {
  lat: types.number,
  lng: types.number
});

export default MapCoordinates;
