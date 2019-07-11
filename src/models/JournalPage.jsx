import { getParentOfType, types } from "mobx-state-tree";
import JournalPageBase from "./JournalPageBase";
import PhotoBase from "./PhotoBase";
import Journey from "./Journey";

const JournalPage = JournalPageBase.named("JournalPage")
  .props({
    text: types.string,
    photos: types.optional(types.array(PhotoBase), [])
  })
  .views((self) => ({
    findPhoto(id) {
      return self.photos.find((photo) => photo.filename === id);
    },
    get mapLocationVisits() {
      return getParentOfType(self, Journey).mapLocationVisits.filter(
        (visit) => {
          if (self.dateStart) {
            return (
              self.dateStart < visit.timestamp && self.dateEnd > visit.timestamp
            );
          } else {
            return true;
          }
        }
      );
    },
    get uniqueVisitedLocations() {
      return Array.from(
        new Set(self.mapLocationVisits.map((visit) => visit.location))
      );
    }
  }));

export default JournalPage;
