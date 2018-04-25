import { types } from 'mobx-state-tree';

const Tag = types.model('Tag', {
  id: types.identifier(types.number),
  name: types.map(types.string, types.string),
  children: types.maybe(types.array(types.late(() => Tag)))
});

export default Tag;
