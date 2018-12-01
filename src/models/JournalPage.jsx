import { types } from "mobx-state-tree";
import JournalPageBase from "./JournalPageBase";
import PhotoBase from "./PhotoBase";

const JournalPage = JournalPageBase.named("JournalPage").props({
  text: types.string,
  photos: types.maybe(types.array(PhotoBase))
});

export default JournalPage;
