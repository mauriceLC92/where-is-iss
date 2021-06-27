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
    Mutation: {
        createLocation: async (_, __, { dataSources }) => {
            const location =
                await dataSources.currentLocationAPI.getCurrentLocation();
            return dataSources.db.insertLocation(location);
        },
    },
};
