import { types, getParent } from "mobx-state-tree";
import { DateTime } from "luxon";

const JournalPage = types
  .model("JournalPage", {
    date: types.string,
    date_end: types.maybe(types.string),
    name: types.maybe(types.string),
    text: types.string
  })
  .views((self) => ({
    get route() {
      return `${getParent(self, 2).route}/${self.date}`;
    },
    get photos() {
      const startTime = DateTime.fromSQL(self.date, {
        zone: "UTC"
      });
      const endTime = DateTime.fromSQL(
        self.date_end && self.date_end !== "0000-00-00"
          ? self.date_end
          : self.date,
        {
          zone: "UTC"
        }
      ).endOf("day");

      return getParent(self, 2).photos.filter((photo) =>
        photo.takenBetween(startTime, endTime)
      );
    },
    get displayName() {
      let text = new Date(self.date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      if (self.date_end && self.date_end !== "0000-00-00") {
        text +=
          "–" +
          new Date(self.date_end).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });
      }

      if (self.name) {
        text += ": " + self.name;
      }

      return text;
    }
  }));

export default JournalPage;
