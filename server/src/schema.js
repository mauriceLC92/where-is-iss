const { gql } = require('apollo-server');

const typeDefs = gql`
  type CurrentLocation {
      message: String
      timestamp: String
      issPosition: IssPosition
  }

  type IssPosition {
    latitude: String
    longitude: String
  }

  type Query {
    locations: [CurrentLocation]!
  }

`;

module.exports = typeDefs;