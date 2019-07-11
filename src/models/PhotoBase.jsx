import { getRoot, types } from "mobx-state-tree";
import { Interval, DateTime } from "luxon";

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
    accessUrl: types.maybeNull(types.string),
    thumbUrl: types.maybeNull(types.string),
    journeySlug: types.string
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
    get localTime() {
      return DateTime.fromISO(self.timestamp, {
        zone: "UTC"
      }).setZone(self.timezone);
    },
    get homeTime() {
      return DateTime.fromISO(self.timestamp, {
        zone: "UTC"
      }).setZone(getRoot(self).configStore.config.HOME_TIMEZONE);
    }
  }));

export default PhotoBase;
