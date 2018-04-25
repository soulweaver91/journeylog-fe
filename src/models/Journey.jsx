import { types } from 'mobx-state-tree';
import JournalPage from "./JournalPage";
import MapLocationVisit from "./MapLocationVisit";
import MapPointVisit from "./MapPointVisit";
import Photo from "./Photo";

const Journey = types.model('Journey', {
  id: types.identifier(types.number),
  name: types.string,
  description: types.optional(types.string, ""),
  journal: types.array(JournalPage),
  mapLocations: types.array(MapLocationVisit),
  mapRoute: types.array(MapPointVisit),
  photos: types.array(Photo)
});

export default Journey;
