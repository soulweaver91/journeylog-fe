import { types, getParent } from 'mobx-state-tree';

const JournalPage = types.model('JournalPage', {
  date: types.string,
  text: types.string
}).views((self) => ({
  get route() {
    return `${getParent(self, 2).route}/${self.date}`;
  },
  get photos() {
    return getParent(self, 2).photos.filter((photo) => photo.takenOnDay(self.date));
  }
}));

export default JournalPage;
