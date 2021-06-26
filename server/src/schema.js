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

  type Query {
    currentLocation: CurrentLocation!
  }

`;

module.exports = typeDefs;