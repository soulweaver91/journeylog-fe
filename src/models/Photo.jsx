import { types } from "mobx-state-tree";
import Tag from "./Tag";
import { getCoords } from "./util/SharedFunctions";
import PhotoBase from "./PhotoBase";

const Photo = PhotoBase.named("Photo")
  .props({
    id: types.identifier(types.number),
    latitude: types.maybe(types.number),
    longitude: types.maybe(types.number),
    description: types.maybe(types.string),
    tags: types.optional(types.array(types.reference(Tag)), []),
    isoSpeed: types.maybe(types.string),
    focalLength: types.maybe(types.string),
    fValue: types.maybe(types.string),
    exposure: types.maybe(types.string),
    cameraMake: types.maybe(types.string),
    cameraModel: types.maybe(types.string),
    flashFired: types.optional(types.boolean, false),
    flashManual: types.optional(types.boolean, false)
  })
  .views((self) => ({
    get coords() {
      return getCoords(self);
    }
  }));

export default Photo;
