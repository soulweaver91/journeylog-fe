import React, { Component } from "react";
import { Provider, observer } from "mobx-react";
import { BrowserRouter } from "react-router-dom";

import JourneyLog from "./components/JourneyLog";
import RootStore from "./stores";
import BrowserSupportBar from "./components/BrowserSupportBar";
import AboutModal from "./components/AboutModal";
import DefaultSpinner from "./components/loader/DefaultSpinner";
import { UI_BREAKPOINTS, MatchMediaProvider } from "./util/Media";

const store = RootStore.create({
  journeyStore: {
    journeys: []
  },
  tagStore: {
    tags: []
  },
  mapLocationStore: {
    mapLocations: {}
  },
  photoModalStore: {
    isOpen: false
  },
  photoStore: {},
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
          <MatchMediaProvider breakpoints={UI_BREAKPOINTS}>
            <div className="App">
              {store.hasErrors || !store.configStore.online ? (
                <div className="App__whole-screen">
                  <div className="App__whole-screen-main-icon" />
                  <span>
                    JourneyLog is currently unavailable. Please try again later.
                  </span>
                </div>
              ) : store.isLoaded ? (
                <JourneyLog />
              ) : (
                <div className="App__whole-screen">
                  <div className="App__whole-screen-main-icon" />
                  <div className="center">JourneyLog is loading...</div>
                  <DefaultSpinner />
                </div>
              )}
              <BrowserSupportBar />
              <AboutModal />
            </div>
          </MatchMediaProvider>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
