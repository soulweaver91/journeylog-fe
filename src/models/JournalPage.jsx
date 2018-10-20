import { types, getParent } from "mobx-state-tree";
import { DateTime } from "luxon";

const JournalPage = types
  .model("JournalPage", {
    slug: types.string,
    dateStart: types.string,
    dateEnd: types.maybe(types.string),
    name: types.maybe(types.string),
    text: types.string
  })
  .views((self) => ({
    get route() {
      return `${getParent(self, 2).route}/${self.slug}`;
    },
    get photos() {
      const startTime = DateTime.fromSQL(self.dateStart, {
        zone: "UTC"
      });
      const endTime = DateTime.fromSQL(
        self.dateEnd && self.dateEnd !== "0000-00-00"
          ? self.dateEnd
          : self.dateStart,
        {
          zone: "UTC"
        }
      ).endOf("day");

      return getParent(self, 2).photos.filter((photo) =>
        photo.takenBetween(startTime, endTime)
      );
    },
    get displayName() {
      let text = new Date(self.dateStart).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      if (self.dateEnd && self.dateEnd !== "0000-00-00") {
        text +=
          "–" +
          new Date(self.dateEnd).toLocaleDateString("en-GB", {
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
