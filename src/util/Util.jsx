import React from "react";

const SI_PREFIXES = ["", "ki", "Mi", "Gi", "Ti", "Pi"];

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
  }
};
