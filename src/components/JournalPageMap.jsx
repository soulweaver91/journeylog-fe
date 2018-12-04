import React from "react";
import { GoogleMapComponent } from "./map/GoogleMapComponent";
import LocationMarker from "./map/LocationMarker";
import { Alert } from "reactstrap";

class JournalPageMap extends React.Component {
  state = {
    markerWithOpenInfoboxId: null
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
          <GoogleMapComponent>
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
          <Alert color="warning">No map for this journal page available.</Alert>
        )}
      </div>
    );
  }
}

export default JournalPageMap;
