import { types } from "mobx-state-tree";

const LocationIcon = {
  AIRPORT: "plane",
  AMUSEMENT_PARK: "laugh", // would prefer ferris wheel if it existed
  ARCADE: "trophy",
  BAR: "wine-glass-alt",
  BEACH: "beach-umbrella",
  BICYCLING: "bicycle",
  BUILDING: "building",
  BUS_STATION: "bus",
  CAFE: "coffee",
  CAMPING: "campground",
  CHURCH: "church",
  ESCAPE_ROOM: "door-open",
  GAS_STATION: "gas-pump",
  HOME: "home",
  HOSPITAL: "hospital",
  HOTEL: "bed",
  INFO_CENTER: "info-circle",
  KARAOKE: "microphone",
  MARKETPLACE: "store",
  MONUMENT: "monument",
  MOVIE_THEATER: "film",
  MUSEUM: "university",
  ONBOARD_AIRPLANE: "plane",
  ONBOARD_BUS: "bus",
  ONBOARD_SHIP: "ship",
  ONBOARD_TAXI: "taxi",
  PARK: "tree-alt",
  PLACE: "map-pin",
  RAILWAY_STATION: "train",
  RESTAURANT: "utensils-alt",
  SPA: "spa",
  SHOP: "shopping-cart",
  SHRINE: "torii-gate",
  SHIP_TERMINAL: "anchor",
  SPORTS_CENTER: "racquet",
  SUBWAY_STATION: "subway",
  THEATER: "theater-masks",
  ZOO: "elephant"
};

export default LocationIcon;

export const LocationIconType = types.enumeration(
  "LocationIcon",
  Object.keys(LocationIcon)
);
