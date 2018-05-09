import { types, flow } from 'mobx-state-tree';
import JourneyStore from "./JourneyStore";
import TagStore from "./TagStore";
import MapLocationStore from "./MapLocationStore";
import Api from '../util/Api';
import RequestState, {RequestStateType} from "./util/RequestState";

const RootStore = types.model('RootStore', {
  JourneyStore: types.maybe(JourneyStore, {}),
  TagStore: types.maybe(TagStore, {}),
  MapLocationStore: types.maybe(MapLocationStore, {}),
  status: types.maybe(RequestStateType, RequestState.UNINITIALIZED)
}).actions((self) => ({
  bootstrap: flow(function*() {
    try {
      const data = yield Api.request('journeys');

      self.TagStore.loadTags(data.tags);
      self.MapLocationStore.loadLocations(data.mapLocations);
      self.JourneyStore.loadJourneys(data.journeys);
      self.status = RequestState.LOADED;
    } catch (e) {
      self.status = RequestState.ERROR;
      console.log(e);
    }
  })
}));

export default RootStore;
