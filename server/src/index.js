require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const { BaseRedisCache } = require('apollo-server-cache-redis');
const Redis = require('ioredis');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const CurrentLocationAPI = require('./datasources/current-location');
const Location = require('./datasources/location');

const knexConfig = {
    client: 'pg',
    connection: {
        user: 'postgres',
        password: 'pass',
        database: 'development',
        port: 9002,
    },
};

const db = new Location(knexConfig);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new BaseRedisCache({
        client: new Redis({
            // host: 'redis-server',
            port: 9003, // Redis port
            // host: '127.0.0.1', // Redis host
            // family: 4, // 4 (IPv4) or 6 (IPv6)
            // password: 'auth',
            // db: 0,
        }),
    }),
    dataSources: () => ({
        currentLocationAPI: new CurrentLocationAPI(),
        db,
    }),
});

// Connect to 127.0.0.1:6380, db 4, using password "authpassword":
// new Redis("redis://:authpassword@127.0.0.1:6380/4");

// // Username can also be passed via URI.
// // It's worth to noticing that for compatibility reasons `allowUsernameInURI`
// // need to be provided, otherwise the username part will be ignored.
// new Redis(
//   "redis://username:authpassword@127.0.0.1:6380/4?allowUsernameInURI=true"
// );

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
});
