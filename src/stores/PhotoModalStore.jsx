import { types } from "mobx-state-tree";
import Photo from "../models/Photo";

const PhotoModalStore = types
  .model("PhotoModalStore", {
    isOpen: types.boolean,
    photo: types.maybe(types.reference(Photo))
  })
  .actions((self) => ({
    open: (photo) => {
      self.photo = photo;
      self.isOpen = true;
    },
    close: () => {
      self.isOpen = false;
    }
  }));

export default PhotoModalStore;
