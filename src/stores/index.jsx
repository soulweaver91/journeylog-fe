import { types } from 'mobx-state-tree';
import JourneyStore from "./JourneyStore";
import TagStore from "./TagStore";
import MapLocationStore from "./MapLocationStore";

const RootStore = types.model('RootStore', {
  JourneyStore: types.maybe(JourneyStore, {}),
  TagStore: types.maybe(TagStore, {}),
  MapLocationStore: types.maybe(MapLocationStore, {})
});

export default RootStore;
