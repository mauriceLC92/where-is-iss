require('dotenv').config();

const { ApolloServer } = require('apollo-server');
// const { BaseRedisCache } = require('apollo-server-cache-redis');
// const Redis = require('ioredis');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const CurrentLocationAPI = require('./datasources/current-location');
const Location = require('./datasources/location');

const isDev = process.env.NODE_ENV === 'development';
const knexConfig = {
    client: 'pg',
    connection: {
        user: isDev ? process.env.DB_USER_DEV : process.env.DB_USER,
        database: isDev ? process.env.DB_DATABASE_DEV : process.env.DB_DATABASE,
        password: isDev ? process.env.DB_PASSWORD_DEV : process.env.DB_PASSWORD,
        port: isDev ? process.env.DB_PORT_DEV : process.env.DB_PORT,
        host: process.env.DB_HOST_DEV,
        ssl: { rejectUnauthorized: false },
    },
};

const db = new Location(knexConfig);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // cache: new BaseRedisCache({
    // client: new Redis({
    //     host: isDev ? process.env.REDIS_HOST_DEV : null,
    //     port: isDev ? process.env.REDIS_PORT_DEV : process.env.REDIS_PORT, // Redis port
    //     // family: 4, // 4 (IPv4) or 6 (IPv6)
    //     // password: isDev ? process.env.REDIS_PASSWORD_DEV : null,
    //     connectTimeout: 10000,
    // }),
    // client: new Redis(
    //     process.env.REDIS_PORT_DEV,
    //     process.env.REDIS_HOST_DEV,
    //     {
    //         connectTimeout: 10000,
    //         lazyConnect: true,
    //     }
    // ),
    // }),
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
