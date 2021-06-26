module.exports = {
    Query: {
        currentLocation: (_, __, { dataSources }) =>
            dataSources.currentLocationAPI.getCurrentLocation(),
        locations: (_, __, { dataSources }) => dataSources.db.getAllLocations(),
        location: (_, { id }, { dataSources }) =>
            dataSources.db.getLocationById({ locationId: id }),
        lastHourLocations: (_, __, { dataSources }) =>
            dataSources.db.getLocationsInLastHour(),
    },
};
