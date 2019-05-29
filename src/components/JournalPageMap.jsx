import React from "react";
import { GoogleMapComponent } from "./map/GoogleMapComponent";
import LocationMarker from "./map/LocationMarker";
import { Alert } from "reactstrap";

class JournalPageMap extends React.Component {
  state = {
    markerWithOpenInfoboxId: null
  };
  mapRef = null;
  deferredOperations = [];

  componentDidMount() {
    this.centerOnMarkers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.locations !== prevProps.locations) {
      this.centerOnMarkers();
    }
  }

  setMapRef = (ref) => {
    this.mapRef = ref;
    this.deferredOperations.forEach((operation) => operation(ref));
    this.deferredOperations = [];
  };

  whenMapLoaded = (func) => {
    if (this.mapRef) {
      func(this.mapRef);
    } else {
      this.deferredOperations.push(func);
    }
  };

  centerOnMarkers = () => {
    this.whenMapLoaded((map) => {
      const google = window.google;

      let bounds = new google.maps.LatLngBounds();
      this.props.locations
        .filter((location) => location.latitude && location.longitude)
        .forEach((location) =>
          bounds.extend({ lat: location.latitude, lng: location.longitude })
        );

      map.fitBounds(bounds);
    });
  };

  onClickMarker = (id) => {
    this.setState((state) => ({
      ...state,
      markerWithOpenInfoboxId: id
    }));
  };

  onCloseInfobox = (id) => {
    if (id === this.state.markerWithOpenInfoboxId) {
      this.setState((state) => ({
        ...state,
        markerWithOpenInfoboxId: null
      }));
    }
  };

  render() {
    const locations = this.props.locations
      ? this.props.locations.filter(
          (location) =>
            location.latitude !== null && location.longitude !== null
        )
      : [];

    return (
      <div className="JournalPageMap">
        {locations && locations.length > 0 ? (
          <GoogleMapComponent getRef={this.setMapRef}>
            {locations.map((location) => (
              <LocationMarker
                location={location}
                key={location.id}
                onClick={this.onClickMarker}
                onClose={this.onCloseInfobox}
                open={location.id === this.state.markerWithOpenInfoboxId}
              />
            ))}
          </GoogleMapComponent>
        ) : (
          <div className="JournalPageMap__alert-container">
            <Alert color="warning">
              No map for this journal page available.
            </Alert>
          </div>
        )}
      </div>
    );
  }
}

export default JournalPageMap;
