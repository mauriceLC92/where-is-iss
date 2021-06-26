require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const CurrentLocationAPI = require('./datasources/current-location');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      currentLocationAPI: new CurrentLocationAPI(),
    })
  });

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
});