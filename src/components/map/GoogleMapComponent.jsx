import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";

const InnerGoogleMapComponent = withScriptjs(
  withGoogleMap(({ children, getRef, center, zoom }) => (
    <GoogleMap defaultZoom={zoom} defaultCenter={center} ref={getRef}>
      {children}
    </GoogleMap>
  ))
);

// noinspection JSUnresolvedVariable
export const GoogleMapComponent = ({
  getRef,
  center = { lat: 0, lng: 0 },
  zoom = 1,
  ...rest
}) => (
  <InnerGoogleMapComponent
    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100%` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    getRef={getRef}
    center={{ lat: 0, lng: 0 }}
    zoom={1}
    {...rest}
  />
);
