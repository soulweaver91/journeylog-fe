import { types } from "mobx-state-tree";
import JournalPage from "./JournalPage";
import MapLocationVisit from "./MapLocationVisit";
import MapPointVisit from "./MapPointVisit";
import Photo from "./Photo";

const Journey = types
  .model("Journey", {
    slug: types.identifier(types.string),
    name: types.string,
    description: types.optional(types.string, ""),
    journalPages: types.array(JournalPage),
    journalPagesCount: types.number,
    mapLocations: types.optional(types.array(MapLocationVisit), []),
    mapRoute: types.optional(types.array(MapPointVisit), []),
    // TODO
    // photos: types.optional(types.array(Photo), []),
    photosCount: types.number,
    background: types.maybe(types.string)
  })
  .views((self) => ({
    get route() {
      return `/journey/${self.slug}`;
    },
    findPage(slug) {
      return self.journalPages.find((page) => page.slug === slug);
    },
    findPhoto(id) {
      // TODO
      // return self.photos.find((photo) => photo.filename === id);
      return null;
    }
  }));

export default Journey;
