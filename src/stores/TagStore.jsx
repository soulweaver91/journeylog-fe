import { types } from "mobx-state-tree";
import Tag from "../models/Tag";

const TagStore = types
  .model("TagStore", {
    tags: types.array(Tag)
  })
  .actions((self) => ({
    loadTags: (tags) => (self.tags = tags)
  }));

export default TagStore;
