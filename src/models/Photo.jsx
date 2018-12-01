import { types } from "mobx-state-tree";
import Tag from "./Tag";
import { getCoords } from "./util/SharedFunctions";
import PhotoBase from "./PhotoBase";

const Photo = PhotoBase.named("Photo")
  .props({
    latitude: types.maybe(types.number),
    longitude: types.maybe(types.number),
    description: types.maybe(types.string),
    tags: types.optional(types.array(types.reference(Tag)), []),
    iso_speed: types.maybe(types.string),
    focal_length: types.maybe(types.string),
    f_value: types.maybe(types.string),
    exposure: types.maybe(types.string),
    camera_make: types.maybe(types.string),
    camera_model: types.maybe(types.string),
    flash_fired: types.optional(types.boolean, false),
    flash_manual: types.optional(types.boolean, false)
  })
  .views((self) => ({
    get coords() {
      return getCoords(self);
    }
  }));

export default Photo;
