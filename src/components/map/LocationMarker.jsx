import React from "react";
import { InfoWindow, Marker } from "react-google-maps";

class LocationMarker extends React.Component {
  render() {
    const { location, open, onClose, onClick } = this.props;

    return (
      <Marker
        position={{ lat: location.latitude, lng: location.longitude }}
        key={location.id}
        onClick={() => onClick(location.id)}
      >
        {open && (
          <InfoWindow onCloseClick={() => onClose(location.id)}>
            <div className="marker-text">{location.name}</div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

export default LocationMarker;
