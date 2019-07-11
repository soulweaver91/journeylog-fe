import { types } from "mobx-state-tree";
import Tag from "./Tag";
import { getCoords } from "./util/SharedFunctions";
import PhotoBase from "./PhotoBase";

const Photo = PhotoBase.named("Photo")
  .props({
    id: types.identifierNumber,
    latitude: types.maybeNull(types.number),
    longitude: types.maybeNull(types.number),
    description: types.maybeNull(types.string),
    tags: types.optional(types.array(types.reference(Tag)), []),
    isoSpeed: types.maybeNull(types.string),
    focalLength: types.maybeNull(types.string),
    fValue: types.maybeNull(types.string),
    exposure: types.maybeNull(types.string),
    cameraMake: types.maybeNull(types.string),
    cameraModel: types.maybeNull(types.string),
    flashFired: types.optional(types.boolean, false),
    flashManual: types.optional(types.boolean, false)
  })
  .views((self) => ({
    get coords() {
      return getCoords(self);
    }
  }));

export default Photo;
