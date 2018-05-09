import { types } from 'mobx-state-tree';

const RequestState = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
  UNINITIALIZED: 'UNINITIALIZED'
};

export default RequestState;

export const RequestStateType = types.enumeration(
  'RequestState',
  Object.values(RequestState)
);
