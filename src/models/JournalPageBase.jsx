import { types, getParent } from "mobx-state-tree";
import { DateTime } from "luxon";

export const JournalPageType = {
  REGULAR: "REGULAR",
  SPECIAL: "SPECIAL"
};

const JournalPageBase = types
  .model("JournalPageBase", {
    slug: types.string,
    dateStart: types.maybeNull(types.string),
    dateEnd: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    photosCount: types.number,
    type: types.enumeration(Object.values(JournalPageType)),
    disabledModules: types.optional(types.array(types.number), [])
  })
  .views((self) => ({
    get route() {
      return `${getParent(self, 2).route}/${self.slug}`;
    },
    get displayName() {
      if (!self.dateStart || self.type !== JournalPageType.REGULAR) {
        return self.name || "(unnamed page)";
      }

      const dateStart = DateTime.fromISO(self.dateStart);
      const dateEnd = DateTime.fromISO(self.dateEnd);
      let text = dateStart.setLocale("en-GB").toLocaleString({
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      if (dateStart.plus({ days: 1 }) < dateEnd) {
        text +=
          "–" +
          dateEnd.setLocale("en-GB").toLocaleString({
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
