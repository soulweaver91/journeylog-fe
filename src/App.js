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
            text: `[section]
                Lorem ipsum dolor sit [b]amet[/b], consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.
              [/section]
              [section location="1" connected="true"]
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.  2
                [photo]P4070001.JPG[/photo]
              [/section]
              [section location="2" connected="true"]
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.  3
              [/section]
              [section location="1" connected="true"][/section]
              [section location="2" connected="true"][/section]
              [section location="3"]
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.  3
              [/section]
              [section]
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.  4
              [/section]
              [section location="1"]
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.  5
              [/section]`
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
