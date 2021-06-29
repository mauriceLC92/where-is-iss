const { gql } = require('apollo-server');

const typeDefs = gql`
    type CurrentLocation {
        message: String @cacheControl(maxAge: 30)
        timestamp: Int @cacheControl(maxAge: 30)
        issPosition: IssPosition @cacheControl(maxAge: 30)
    }

    type IssPosition {
        latitude: String @cacheControl(maxAge: 30)
        longitude: String @cacheControl(maxAge: 30)
    }

    type Location {
        id: ID! @cacheControl(maxAge: 30)
        location: CurrentLocation @cacheControl(maxAge: 30)
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
