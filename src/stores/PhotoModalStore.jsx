import { types } from "mobx-state-tree";
import Photo from "../models/Photo";
import Util from "../util/Util";

const PhotoModalStore = types
  .model("PhotoModalStore", {
    isOpen: types.boolean,
    photo: types.maybe(types.reference(Photo))
  })
  .actions((self) => ({
    open: (photo) => {
      self.photo = photo;
      self.isOpen = true;
      document.location.hash = `#photo:${self.photo.filename}`;
    },
    close: () => {
      self.isOpen = false;
      Util.clearHash();
    }
  }));

export default PhotoModalStore;
