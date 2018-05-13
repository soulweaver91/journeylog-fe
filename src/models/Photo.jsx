import { types } from "mobx-state-tree";
import Tag from "./Tag";
import { DateTime } from "luxon";
import { getCoords } from "./util/SharedFunctions";

const Photo = types
  .model("Photo", {
    name: types.identifier(types.string),
    latitude: types.maybe(types.number),
    longitude: types.maybe(types.number),
    description: types.maybe(types.string),
    tags: types.array(types.reference(Tag)),
    timestamp: types.string,
    timezone: types.optional(types.string, "UTC")
  })
  .views((self) => ({
    takenOnDay(date) {
      const thisDate = DateTime.fromISO(self.timestamp, {
        zone: self.timezone
      });
      const otherDate = DateTime.fromISO(date + "T00:00:00Z", {
        zone: self.timezone
      });

      return thisDate.hasSame(otherDate, "day");
    },
    get coords() {
      return getCoords(self);
    }
  }));

export default Photo;
