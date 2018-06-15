export function getCoords(self) {
  // can't compare with ! since 0 is a valid lat/lng but is falsy
  if (
    self.latitude === null ||
    self.latitude === undefined ||
    self.longitude === null ||
    self.latitude === undefined
  ) {
    return null;
  }

  return {
    lat: self.latitude,
    lng: self.longitude
  };
}

export function associatePairs(array, keyField, valueField) {
  if (!(array instanceof Array)) {
    return {};
  }

  return array.reduce((iter, item) => {
    iter[item[keyField]] = item[valueField];

    return iter;
  }, {});
}
