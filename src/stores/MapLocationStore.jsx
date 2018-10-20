import { types } from "mobx-state-tree";
import MapLocation from "../models/MapLocation";
import RequestState, { RequestStateType } from "./util/RequestState";
import { flow } from "mobx-state-tree";
import Api from "../util/Api";

const MapLocationStore = types
  .model("MapLocationStore", {
    mapLocations: types.array(MapLocation),
    status: types.maybe(RequestStateType, RequestState.UNINITIALIZED)
  })
  .actions((self) => ({
    loadLocations: flow(function*() {
      try {
        self.status = RequestState.LOADING;

        self.mapLocations = yield Api.request("locations");
        self.status = RequestState.LOADED;
      } catch (e) {
        self.status = RequestState.ERROR;
        console.log(e);
        throw e;
      }
    })
  }))
  .views((self) => ({
    findLocation: (id) =>
      self.mapLocations.find((location) => location.id === parseInt(id, 10))
  }));

export default MapLocationStore;
