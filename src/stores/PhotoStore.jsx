import { types } from "mobx-state-tree";
import RequestState, { RequestStateType } from "./util/RequestState";
import { flow } from "mobx-state-tree";
import Api from "../util/Api";
import Photo from "../models/Photo";

const PhotoStore = types
  .model("PhotoStore", {
    photos: types.array(Photo),
    requestStatuses: types.optional(types.map(RequestStateType), {})
  })
  .actions((self) => ({
    loadPhotos: flow(function*(query) {
      const key = JSON.stringify(query);

      try {
        self.requestStatuses[key] = RequestState.LOADING;

        const results = yield Api.request("photos", query);

        results.results.forEach((photo) => {
          self.photos[`${photo.journeySlug}/${photo.filename}`] = photo;
        });
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

        self.requestStatuses[key] = RequestState.LOADING;

        const photo = yield Api.request(
          `journeys/${journeySlug}/photos/${filename}`
        );
        self.photos.push(photo);
        self.requestStatuses[key] = RequestState.LOADED;

        return self.photos[key];
      } catch (e) {
        self.requestStatuses[key] = RequestState.ERROR;
        console.log(e);
        throw e;
      }
    })
  }))
  .views((self) => ({
    getPhoto(journeySlug, filename) {
      return self.photos.find(
        (photo) =>
          photo.journeySlug === journeySlug && photo.filename === filename
      );
    }
  }));

export default PhotoStore;
