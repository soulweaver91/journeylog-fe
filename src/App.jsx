import React, { Component } from "react";
import { Provider, observer } from "mobx-react";
import { BrowserRouter } from "react-router-dom";

import JourneyLog from "./components/JourneyLog";
import RootStore from "./stores";
import RequestState from "./stores/util/RequestState";
import BrowserSupportBar from "./components/BrowserSupportBar";

const store = RootStore.create({
  journeyStore: {
    journeys: []
  },
  tagStore: {
    tags: []
  },
  mapLocationStore: {
    mapLocations: []
  },
  photoModalStore: {
    isOpen: false,
    photo: null
  }
});
store.bootstrap();

// noinspection JSUnusedLocalSymbols
const { status, ...childStores } = store;

@observer
class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.REACT_APP_URL_PREFIX}>
        <Provider {...childStores}>
          <div className="App">
            {store.status === RequestState.LOADED ? (
              <JourneyLog />
            ) : store.status === RequestState.ERROR ? (
              <div className="center">
                JourneyLog is currently unavailable. Please try again later.
              </div>
            ) : (
              <div className="center">Loading...</div>
            )}
            <BrowserSupportBar />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
