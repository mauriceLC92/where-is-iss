module.exports = {
    Query: {
      currentLocation: (_, __, { dataSources }) =>
        dataSources.currentLocationAPI.getCurrentLocation(),
    }
  };
  