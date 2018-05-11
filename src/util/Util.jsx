import React from "react";

export default {
  getNextPathElement(location, match) {
    if (!location || !match || !location.pathname) {
      return "";
    }

    const subPath = location.pathname.replace(match.url, "").replace(/^\//, "");
    const pos = subPath.indexOf("/");
    return pos === -1 ? subPath : subPath.substr(0, pos);
  }
};
