const { gql } = require('apollo-server');

const typeDefs = gql`
    type CurrentLocation {
        message: String @cacheControl(maxAge: 5)
        timestamp: Int @cacheControl(maxAge: 5)
        issPosition: IssPosition @cacheControl(maxAge: 5)
    }

    type IssPosition {
        latitude: String @cacheControl(maxAge: 5)
        longitude: String @cacheControl(maxAge: 5)
    }

    type Location {
        id: ID! @cacheControl(maxAge: 5)
        location: CurrentLocation @cacheControl(maxAge: 5)
    }

    type Query {
        currentLocation: CurrentLocation!

        locations: [Location]!
        location(id: ID!): Location
        lastHourLocations: [Location]!
    }

    type CreateLocationResponse {
        id: ID!
        message: String
        timestamp: Int
        latitude: String
        longitude: String
    }

    type Mutation {
        createLocation: CreateLocationResponse
    }
`;

module.exports = typeDefs;
