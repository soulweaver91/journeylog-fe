import { types } from 'mobx-state-tree';
import Journey from "../models/Journey";

const JourneyStore = types.model('JourneyStore', {
  journeys: types.array(Journey)
}).views((self) => {
  return {
    findJourney: (id) => self.journeys.find((journey) => journey.slug === id)
  };
}).actions((self) => ({
  loadJourneys: (journeys) => self.journeys = journeys
}));

export default JourneyStore;
