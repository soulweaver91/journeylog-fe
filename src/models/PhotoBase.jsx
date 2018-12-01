import { types } from "mobx-state-tree";
import { Interval, DateTime } from "luxon";

// TODO
const HOME_TIMEZONE = "Europe/Helsinki";

const PhotoBase = types
  .model("PhotoBase", {
    name: types.string,
    hash: types.string,
    filename: types.string,
    filesize: types.number,
    confidentiality: types.number,
    timestamp: types.string,
    timezone: types.optional(types.string, "UTC"),
    width: types.number,
    height: types.number,
    accessUrl: types.maybe(types.string),
    thumbUrl: types.maybe(types.string)
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
    }
  }));

export default PhotoBase;
