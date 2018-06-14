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
    journal: types.array(JournalPage),
    map_locations: types.optional(types.array(MapLocationVisit), []),
    map_route: types.optional(types.array(MapPointVisit), []),
    photos: types.array(Photo),
    background: types.maybe(types.string)
  })
  .views((self) => ({
    get route() {
      return `/journey/${self.slug}`;
    },
    findPage(date) {
      return self.journal.find((page) => page.date === date);
    },
    findPhoto(id) {
      return self.photos.find((photo) => photo.filename === id);
    }
  }));

export default Journey;
