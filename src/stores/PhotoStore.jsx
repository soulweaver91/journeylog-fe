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
          links: types.model({
            next: types.maybe(types.string),
            previous: types.maybe(types.string)
          }),
          results: types.array(types.reference(Photo)),
          count: types.number,
          perPage: types.number,
          totalPages: types.number
        })
      ),
      {}
    )
  })
  .actions((self) => ({
    loadPhotos: flow(function*(query) {
      const key = "q" + JSON.stringify(query);

      try {
        const preloaded = self.photoSearchResults.get(key);
        if (preloaded) {
          return preloaded;
        }

        self.requestStatuses.set(key, RequestState.LOADING);

        const results = yield Api.request("photos", {
          params: query
        });

        results.results.forEach((photo) => {
          const photoKey = `${photo.journeySlug}/${photo.filename}`;

          // If already loaded by some other source (such as a modal
          // on page load), don't do anything to it.
          // Page load accurate caching
          if (!self.photos.get(photo.id)) {
            self.photos.set(photo.id, photo);
          }

          self.photosByString.set(photoKey, photo.id);
          self.requestStatuses.set(photoKey, RequestState.LOADED);
        });
        results.results = results.results.map((photo) => photo.id);

        self.photoSearchResults.set(key, results);
        self.requestStatuses.set(key, RequestState.LOADED);

        return self.photoSearchResults.get(key);
      } catch (e) {
        self.requestStatuses.set(key, RequestState.ERROR);
        console.log(e);
        throw e;
      }
    }),
    loadPhoto: flow(function*(journeySlug, filename) {
      const key = `${journeySlug}/${filename}`;

      try {
        const preloaded = self.getPhoto(journeySlug, filename);
        if (preloaded) {
          return preloaded;
        }

        self.requestStatuses.set(key, RequestState.LOADING);

        const photo = yield Api.request(
          `journeys/${journeySlug}/photos/${filename}`
        );

        self.photos.set(photo.id, photo);
        self.photosByString.set(key, photo.id);

        self.requestStatuses.set(key, RequestState.LOADED);

        return self.getPhoto(journeySlug, filename);
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
    },
    getResultsForQuery(query) {
      return self.photoSearchResults.get("q" + JSON.stringify(query));
    },
    getStatusForQuery(query) {
      return self.requestStatuses.get("q" + JSON.stringify(query));
    }
  }));

export default PhotoStore;
