import { types } from 'mobx-state-tree';
import Journey from "../models/Journey";

const JourneyStore = types.model('JourneyStore', {
  journeys: types.array(Journey)
});

export default JourneyStore;
