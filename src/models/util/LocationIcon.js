import { types } from "mobx-state-tree";

const LocationIcon = {
  AIRPORT: "plane",
  RAILWAY_STATION: "train",
  SUBWAY_STATION: "subway",
  BUS_STATION: "bus",
  ONBOARD_AIRPLANE: "plane",
  ONBOARD_SHIP: "ship",
  ONBOARD_BUS: "bus",
  RESTAURANT: "utensils-alt",
  CAFE: "coffee",
  HOTEL: "bed",
  SHOP: "shopping-cart",
  PARK: "tree-alt",
  BUILDING: "building",
  KARAOKE: "microphone",
  INFO_CENTER: "info-circle",
  ARCADE: "trophy",
  HOME: "home",
  MUSEUM: "university",
  SHRINE: "sun", // no good candidate icon right now
  PLACE: "map-pin",
  MONUMENT: "star"
};

export default LocationIcon;

export const LocationIconType = types.enumeration(
  "LocationIcon",
  Object.keys(LocationIcon)
);
