import { types } from "mobx-state-tree";

const AboutModalStore = types
  .model("PhotoModalStore", {
    isOpen: types.boolean
  })
  .actions((self) => ({
    open: () => {
      self.isOpen = true;
    },
    close: () => {
      self.isOpen = false;
    }
  }));

export default AboutModalStore;
