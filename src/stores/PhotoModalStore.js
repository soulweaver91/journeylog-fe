import { types } from "mobx-state-tree";
import Util from "../util/Util";
import { observable } from "mobx";

const PhotoModalStore = types
  .model("PhotoModalStore", {
    isOpen: types.optional(types.boolean, false),
    journeySlug: types.maybeNull(types.string),
    filename: types.maybeNull(types.string)
  })
  .extend((self) => {
    let activeContext = observable.box({});

    return {
      actions: {
        open: (journeySlug, filename, { context } = {}) => {
          self.isOpen = true;
          self.journeySlug = journeySlug;
          self.filename = filename;
          if (context) {
            console.log("context", context);
            activeContext.set(context);
          }
          document.location.hash = self.getHash(journeySlug, filename);
        },
        close: () => {
          self.isOpen = false;
          Util.clearHash();
        },
        getHash: (journeySlug, filename) => {
          return `#photo:${journeySlug}/${filename}`;
        }
      },
      views: {
        get context() {
          return activeContext;
        }
      }
    };
  });

export default PhotoModalStore;
