import { types } from "mobx-state-tree";

const MapLocationName = types.model("MapLocationName", {
  name: types.string,
  sortKey: types.maybeNull(types.string)
});

export default MapLocationName;
