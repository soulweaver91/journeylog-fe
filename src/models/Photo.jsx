import { types } from "mobx-state-tree";
import MapCoordinates from "./MapCoordinates";
import Tag from "./Tag";
import { DateTime } from "luxon";

const Photo = types
  .model("Photo", {
    name: types.identifier(types.string),
    coords: types.maybe(MapCoordinates),
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
    }
  }));

export default Photo;
