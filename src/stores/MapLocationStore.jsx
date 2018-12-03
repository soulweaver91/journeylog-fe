import { types } from "mobx-state-tree";
import MapLocation from "../models/MapLocation";
import RequestState, { RequestStateType } from "./util/RequestState";
import { flow } from "mobx-state-tree";
import Api from "../util/Api";

const MapLocationStore = types
  .model("MapLocationStore", {
    mapLocations: types.optional(types.map(MapLocation), {}),
    journeyLocationStatuses: types.optional(types.map(RequestStateType), {})
  })
  .actions((self) => ({
    loadLocations: flow(function*(journeySlug) {
      try {
        if (
          self.journeyLocationStatuses.get(journeySlug) === RequestState.LOADED
        ) {
          return self.journeyLocationStatuses.get(journeySlug);
        }

        self.journeyLocationStatuses.set(journeySlug, RequestState.LOADING);

        const newLocations = yield Api.request("locations/", {
          params: {
            journey: journeySlug
          }
        });

        newLocations.forEach((location) => {
          self.mapLocations.set(location.id.toString(), location);
        });

        self.journeyLocationStatuses.set(journeySlug, RequestState.LOADED);
      } catch (e) {
        self.journeyLocationStatuses.set(journeySlug, RequestState.ERROR);
        console.log(e);
        throw e;
      }
    })
  }))
  .views((self) => ({
    findLocation: (id) => self.mapLocations.get(id.toString())
  }));

export default MapLocationStore;
