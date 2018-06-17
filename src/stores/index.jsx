import { types, flow } from "mobx-state-tree";
import JourneyStore from "./JourneyStore";
import TagStore from "./TagStore";
import MapLocationStore from "./MapLocationStore";
import Api from "../util/Api";
import RequestState, { RequestStateType } from "./util/RequestState";
import PhotoModalStore from "./PhotoModalStore";
import AboutModalStore from "./AboutModalStore";

const RootStore = types
  .model("RootStore", {
    journeyStore: types.maybe(JourneyStore, {}),
    tagStore: types.maybe(TagStore, {}),
    mapLocationStore: types.maybe(MapLocationStore, {}),
    status: types.maybe(RequestStateType, RequestState.UNINITIALIZED),
    photoModalStore: types.maybe(PhotoModalStore, {}),
    aboutModalStore: types.maybe(AboutModalStore, {})
  })
  .actions((self) => ({
    bootstrap: flow(function*() {
      try {
        const data = yield Api.request("journeys");

        self.tagStore.loadTags(data.tags);
        self.mapLocationStore.loadLocations(data.mapLocations);
        self.journeyStore.loadJourneys(data.journeys);
        self.status = RequestState.LOADED;
      } catch (e) {
        self.status = RequestState.ERROR;
        console.log(e);
      }
    })
  }));

export default RootStore;
