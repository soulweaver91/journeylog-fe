import { types } from "mobx-state-tree";
import RequestState, { RequestStateType } from "./util/RequestState";
import { flow } from "mobx-state-tree";
import Api from "../util/Api";
import Photo from "../models/Photo";

const PhotoStore = types
  .model("PhotoStore", {
    photos: types.optional(types.map(Photo), {}),
    photosByString: types.optional(types.map(types.reference(Photo)), {}),
    requestStatuses: types.optional(types.map(RequestStateType), {}),
    photoSearchResults: types.optional(
      types.map(
        types.model({
          next: types.maybe(types.string),
          previous: types.maybe(types.string),
          results: types.reference(Photo),
          count: types.number
        })
      ),
      {}
    )
  })
  .actions((self) => ({
    loadPhotos: flow(function*(query) {
      const key = "q" + JSON.stringify(query);

      try {
        if (self.photoSearchResults[key]) {
          return self.photoSearchResults[key];
        }

        self.requestStatuses[key] = RequestState.LOADING;

        const results = yield Api.request("photos", query);

        results.results.forEach((photo) => {
          self.photos.set(photo.id, photo);
          self.photosByString.set(
            `${photo.journeySlug}/${photo.filename}`,
            photo.id
          );
        });
        results.results = results.results.map((photo) => photo.id);

        self.photoSearchResults[key] = results;
        self.requestStatuses[key] = RequestState.LOADED;

        return results.results;
      } catch (e) {
        self.requestStatuses[key] = RequestState.ERROR;
        console.log(e);
        throw e;
      }
    }),
    loadPhoto: flow(function*(journeySlug, filename) {
      const key = `${journeySlug}/${filename}`;

      try {
        if (self.getPhoto(journeySlug, filename)) {
          return null;
        }

        self.requestStatuses.set(key, RequestState.LOADING);

        const photo = yield Api.request(
          `journeys/${journeySlug}/photos/${filename}`
        );

        self.photos.set(photo.id, photo);
        self.photosByString.set(key, photo.id);

        self.requestStatuses.set(key, RequestState.LOADED);
      } catch (e) {
        self.requestStatuses.set(key, RequestState.ERROR);
        console.log(e);
        throw e;
      }
    })
  }))
  .views((self) => ({
    getPhoto(journeySlug, filename) {
      return self.photosByString.get(`${journeySlug}/${filename}`);
    }
  }));

export default PhotoStore;
