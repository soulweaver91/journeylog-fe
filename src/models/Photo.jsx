import { types } from 'mobx-state-tree';
import MapCoordinates from "./MapCoordinates";
import Tag from "./Tag";

const Photo = types.model('Photo', {
  name: types.identifier(types.string),
  coords: types.maybe(MapCoordinates),
  description: types.maybe(types.string),
  tags: types.array(types.reference(Tag))
});

export default Photo;
