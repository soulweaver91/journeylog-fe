import React, { Component } from 'react';
import logo from './logo.svg';
import { Provider } from 'mobx-react';

import './App.css';
import RootStore from "./stores";

const store = RootStore.create({
  JourneyStore: {
    journeys: [
      {
        id: 1,
        name: 'test journey 1',
        description: 'test journey description',
        journal: [
          {
            date: '2018-01-01',
            text: 'day one journal page'
          },
          {
            date: '2018-01-02',
            text: 'day two journal page'
          },
          {
            date: '2018-01-03',
            text: 'day three journal page'
          }
        ],
        mapLocations: [
          {
            timestamp: '2018-01-01T10:00:00Z',
            location: 1
          }
        ],
        mapRoute: [
          {
            coords: {
              lat: 34.6353604,
              lng: 135.2227263
            },
            timestamp: '2018-01-01T10:00:00Z'
          },
          {
            coords: {
              lat: 34.6353604,
              lng: 135.221
            },
            timestamp: '2018-01-01T10:01:00Z'
          },
          {
            coords: {
              lat: 34.636,
              lng: 135.219
            },
            timestamp: '2018-01-01T10:02:00Z'
          }
        ],
        photos: [
          {
            name: "P4070001.JPG",
            tags: [ 3 ]
          }
        ]
      },
      {
        id: 2,
        name: 'test journey 2',
        journal: [

        ],
        mapLocations: [

        ],
        mapRoute: [

        ],
        photos: [

        ]
      }
    ]
  },
  TagStore: {
    tags: [
      {
        id: 1,
        name: {
          'en': 'Japan'
        },
        children: [
          {
            id: 2,
            name: {
              'en': 'Hyougo-ken'
            }
          },
          {
            id: 3,
            name: {
              'en': 'Oosaka-fu'
            }
          }
        ]
      }
    ]
  },
  MapLocationStore: {
    mapLocations: [
      {
        id: 1,
        name: 'Airport',
        coords: {
          lat: 34.6353604,
          lng: 135.2227263
        }
      }
    ]
  }
});

class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </Provider>
    );
  }
}

export default App;
