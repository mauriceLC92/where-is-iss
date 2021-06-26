require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const CurrentLocationAPI = require('./datasources/current-location');
const Location = require('./datasources/location');

const knexConfig = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'pass',
        database: 'development',
    },
};

const db = new Location(knexConfig);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        currentLocationAPI: new CurrentLocationAPI(),
        db,
    }),
});

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
});
