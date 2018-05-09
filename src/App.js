import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import JourneyLog from "./components/JourneyRoutes";
import RootStore from "./stores";
import RequestState from "./stores/util/RequestState";

const store = RootStore.create({
  JourneyStore: {
    journeys: []
  },
  TagStore: {
    tags: []
  },
  MapLocationStore: {
    mapLocations: []
  }
});
store.bootstrap();

@observer
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider {...store}>
          <div className="App">
            {store.status === RequestState.LOADED ? <JourneyLog /> : <div className="align-content-center">Loading...</div>}
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
