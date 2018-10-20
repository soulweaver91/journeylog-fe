import React, { Component } from "react";
import { Provider, observer } from "mobx-react";
import { BrowserRouter } from "react-router-dom";

import JourneyLog from "./components/JourneyLog";
import RootStore from "./stores";
import BrowserSupportBar from "./components/BrowserSupportBar";
import AboutModal from "./components/AboutModal";

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
  },
  aboutModalStore: {
    isOpen: false
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
            {store.hasErrors ? (
              <div className="center">
                JourneyLog is currently unavailable. Please try again later.
              </div>
            ) : store.isLoaded ? (
              <JourneyLog />
            ) : (
              <div className="center">Loading...</div>
            )}
            <BrowserSupportBar />
            <AboutModal />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
