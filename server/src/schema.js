const { gql } = require('apollo-server');

const typeDefs = gql`
    type CurrentLocation {
        message: String
        timestamp: Int
        issPosition: IssPosition
    }

    type IssPosition {
        latitude: String
        longitude: String
    }

    type Location {
        id: ID!
        location: CurrentLocation
    }

    type Query {
        currentLocation: CurrentLocation!

        locations: [Location]!
        location(id: ID!): Location
        lastHourLocations: [Location]!
    }
`;

module.exports = typeDefs;
