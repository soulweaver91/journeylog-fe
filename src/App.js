import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import JourneyLog from "./components/JourneyRoutes";
import RootStore from "./stores";

const store = RootStore.create({
  JourneyStore: {
    journeys: [
      {
        slug: 'test-journey-1',
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
            tags: [ 3 ],
            timestamp: '2018-01-01T10:00:00Z',
            timezone: 'Asia/Tokyo'
          },
          {
            name: "P4070002.JPG",
            tags: [ ],
            timestamp: '2018-01-01T11:00:00Z',
            timezone: 'Asia/Tokyo'
          },
          {
            name: "P4070003.JPG",
            tags: [ 2 ],
            timestamp: '2018-01-01T12:00:00Z',
            timezone: 'Asia/Tokyo'
          }
        ]
      },
      {
        slug: 'test-journey-2',
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
      <BrowserRouter>
        <Provider {...store}>
          <div className="App">
            <JourneyLog />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
