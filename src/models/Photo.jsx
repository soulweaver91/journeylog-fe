import { types } from "mobx-state-tree";
import Tag from "./Tag";
import { DateTime } from "luxon";
import { getCoords } from "./util/SharedFunctions";

// TODO
const HOME_TIMEZONE = "Europe/Helsinki";

const Photo = types
  .model("Photo", {
    filename: types.identifier(types.string),
    name: types.string,
    filesize: types.number,
    latitude: types.maybe(types.number),
    longitude: types.maybe(types.number),
    description: types.maybe(types.string),
    tags: types.optional(types.array(types.reference(Tag)), []),
    timestamp: types.string,
    timezone: types.optional(types.string, "UTC"),
    iso_speed: types.maybe(types.string),
    focal_length: types.maybe(types.string),
    exposure: types.maybe(types.string),
    camera_make: types.maybe(types.string),
    camera_model: types.maybe(types.string),
    width: types.number,
    height: types.number
  })
  .extend((self) => {
    let localTime = null;
    let homeTime = null;

    return {
      actions: {
        postProcessSnapshot: (snapshot) => {
          localTime = DateTime.fromSQL(snapshot.timestamp, {
            zone: "UTC"
          }).setZone(self.timezone);
          homeTime = DateTime.fromSQL(snapshot.timestamp, {
            zone: "UTC"
          }).setZone(HOME_TIMEZONE);

          return snapshot;
        }
      },
      views: {
        get localTime() {
          return localTime;
        },
        get homeTime() {
          return homeTime;
        }
      }
    };
  })
  .views((self) => ({
    takenOnDay(date) {
      const otherDate = DateTime.fromISO(date + "T00:00:00Z", {
        zone: "UTC"
      }).setZone(self.timezone);

      return self.localTime.hasSame(otherDate, "day");
    },
    get coords() {
      return getCoords(self);
    }
  }));

export default Photo;
