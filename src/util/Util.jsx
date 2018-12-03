import RequestState from "../stores/util/RequestState";

const SI_PREFIXES = ["", "ki", "Mi", "Gi", "Ti", "Pi"];
const STATE_PRECEDENCE = [
  RequestState.ERROR,
  RequestState.LOADING,
  RequestState.UNINITIALIZED,
  RequestState.LOADED
];

export default {
  getNextPathElement(location, match) {
    if (!location || !match || !location.pathname) {
      return "";
    }

    const subPath = location.pathname.replace(match.url, "").replace(/^\//, "");
    const pos = subPath.indexOf("/");
    return pos === -1 ? subPath : subPath.substr(0, pos);
  },
  formatFileSize(bytes) {
    let size = bytes;
    let prefixIdx = 0;

    while (size > 1024 && prefixIdx < SI_PREFIXES.length - 1) {
      size /= 1024;
      prefixIdx++;
    }

    return size.toFixed(2) + " " + SI_PREFIXES[prefixIdx] + "B";
  },
  clearHash() {
    window.history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  },
  formatCoordinate(coordinate) {
    const lat = [
      Math.floor(Math.abs(coordinate.lat)),
      Math.floor((Math.abs(coordinate.lat) * 60) % 60),
      ((Math.abs(coordinate.lat) * 3600) % 60).toFixed(1)
    ];
    const lng = [
      Math.floor(Math.abs(coordinate.lng)),
      Math.floor((Math.abs(coordinate.lng) * 60) % 60),
      ((Math.abs(coordinate.lng) * 3600) % 60).toFixed(1)
    ];

    return `${lat[0]}°${lat[1]}'${lat[2]}" ${coordinate.lat < 0 ? "S" : "N"}, ${
      lng[0]
    }°${lng[1]}'${lng[2]}" ${coordinate.lng < 0 ? "W" : "E"}`;
  },
  combinedRequestState(states) {
    let uniqueStates = new Set(
      states.map((state) => state || RequestState.UNINITIALIZED)
    );

    for (let i = 0; i < STATE_PRECEDENCE.length; i++) {
      if (uniqueStates.has(STATE_PRECEDENCE[i])) {
        return STATE_PRECEDENCE[i];
      }
    }

    return RequestState.LOADED;
  }
};
