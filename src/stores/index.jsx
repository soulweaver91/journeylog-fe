import { types } from "mobx-state-tree";
import JourneyStore from "./JourneyStore";
import TagStore from "./TagStore";
import MapLocationStore from "./MapLocationStore";
import RequestState from "./util/RequestState";
import PhotoModalStore from "./PhotoModalStore";
import AboutModalStore from "./AboutModalStore";

const RootStore = types
  .model("RootStore", {
    journeyStore: types.maybe(JourneyStore, {}),
    tagStore: types.maybe(TagStore, {}),
    mapLocationStore: types.maybe(MapLocationStore, {}),
    photoModalStore: types.maybe(PhotoModalStore, {}),
    aboutModalStore: types.maybe(AboutModalStore, {})
  })
  .actions((self) => ({
    bootstrap: function() {
      self.tagStore.loadTags();
      self.mapLocationStore.loadLocations();
      self.journeyStore.loadJourneys();
    }
  }))
  .views((self) => ({
    get isLoaded() {
      return [
        self.journeyStore.status,
        self.mapLocationStore.status,
        self.tagStore.status
      ].every((status) => status === RequestState.LOADED);
    },
    get hasErrors() {
      return [
        self.journeyStore.status,
        self.mapLocationStore.status,
        self.tagStore.status
      ].some((status) => status === RequestState.ERROR);
    }
  }));

export default RootStore;
