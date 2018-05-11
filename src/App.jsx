import React, { Component } from "react";
import { Provider, observer } from "mobx-react";
import { BrowserRouter } from "react-router-dom";

import JourneyLog from "./components/JourneyLog";
import RootStore from "./stores";
import RequestState from "./stores/util/RequestState";

const store = RootStore.create({
  journeyStore: {
    journeys: []
  },
  tagStore: {
    tags: []
  },
  mapLocationStore: {
    mapLocations: []
  }
});
store.bootstrap();

const { status, ...childStores } = store;

@observer
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider {...childStores}>
          <div className="App">
            {store.status === RequestState.LOADED ? (
              <JourneyLog />
            ) : (
              <div className="align-content-center">Loading...</div>
            )}
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
