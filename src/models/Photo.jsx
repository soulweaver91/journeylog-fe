import { types } from "mobx-state-tree";
import Tag from "./Tag";
import { Interval, DateTime } from "luxon";
import { getCoords } from "./util/SharedFunctions";

// TODO
const HOME_TIMEZONE = "Europe/Helsinki";

const Photo = types
  .model("Photo", {
    filename: types.identifier(types.string),
    name: types.string,
    hash: types.string,
    filesize: types.number,
    confidentiality: types.number,
    latitude: types.maybe(types.number),
    longitude: types.maybe(types.number),
    description: types.maybe(types.string),
    tags: types.optional(types.array(types.reference(Tag)), []),
    timestamp: types.string,
    timezone: types.optional(types.string, "UTC"),
    iso_speed: types.maybe(types.string),
    focal_length: types.maybe(types.string),
    f_value: types.maybe(types.string),
    exposure: types.maybe(types.string),
    camera_make: types.maybe(types.string),
    camera_model: types.maybe(types.string),
    flash_fired: types.optional(types.boolean, false),
    flash_manual: types.optional(types.boolean, false),
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
    takenBetween(startTime, endTime) {
      const interval = Interval.fromDateTimes(
        startTime.setZone(self.timezone, {
          keepLocalTime: true
        }),
        endTime.setZone(self.timezone, {
          keepLocalTime: true
        })
      );
      return interval.contains(self.localTime);
    },
    get coords() {
      return getCoords(self);
    },
    get fullUrl() {
      return `${process.env.REACT_APP_API_URL}photos/${self.hash}/${
        self.filename
      }`;
    },
    get thumbUrl() {
      return `${process.env.REACT_APP_API_URL}photos/${self.hash}/thumb/${
        self.filename
      }`;
    }
  }));

export default Photo;
