import { types } from 'mobx-state-tree';

const JournalPage = types.model('JournalPage', {
  date: types.string,
  text: types.string
});

export default JournalPage;
