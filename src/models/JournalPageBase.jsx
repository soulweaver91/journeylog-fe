import { types, getParent } from "mobx-state-tree";

const JournalPageBase = types
  .model("JournalPageBase", {
    slug: types.string,
    dateStart: types.maybe(types.string),
    dateEnd: types.maybe(types.string),
    name: types.maybe(types.string),
    photosCount: types.number
  })
  .views((self) => ({
    get route() {
      return `${getParent(self, 2).route}/${self.slug}`;
    },
    get displayName() {
      if (!self.dateStart) {
        return self.name || "(unnamed page)";
      }

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

export default JournalPageBase;
