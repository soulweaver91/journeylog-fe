import { types } from "mobx-state-tree";
import Util from "../util/Util";

const PhotoModalStore = types
  .model("PhotoModalStore", {
    isOpen: types.optional(types.boolean, false),
    journeySlug: types.maybeNull(types.string),
    filename: types.maybeNull(types.string)
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
