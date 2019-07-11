import { types } from "mobx-state-tree";

const Tag = types.model("Tag", {
  id: types.identifierNumber,
  name: types.map(types.string, types.string),
  children: types.optional(types.array(types.late(() => Tag)), [])
});

export default Tag;
