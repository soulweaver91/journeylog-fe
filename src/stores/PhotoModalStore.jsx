import { types } from "mobx-state-tree";
import Photo from "../models/Photo";
import Util from "../util/Util";

const PhotoModalStore = types
  .model("PhotoModalStore", {
    isOpen: types.boolean,
    journeySlug: types.maybe(types.string),
    filename: types.maybe(types.string)
  })
  .actions((self) => ({
    open: (journeySlug, filename) => {
      self.isOpen = true;
      self.journeySlug = journeySlug;
      self.filename = filename;
      document.location.hash = self.getHash(journeySlug, filename);
    },
    close: () => {
      self.isOpen = false;
      Util.clearHash();
    },
    getHash: (journeySlug, filename) => {
      return `#photo:${journeySlug}/${filename}`;
    }
  }));

export default PhotoModalStore;
