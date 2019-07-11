import { types } from "mobx-state-tree";

const AboutModalStore = types
  .model("AboutModalStore", {
    isOpen: types.optional(types.boolean, false)
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
