import { types, getParent } from "mobx-state-tree";

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
      return getParent(self, 2).photos.filter((photo) =>
        photo.takenOnDay(self.date)
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
