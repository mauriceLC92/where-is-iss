require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const { BaseRedisCache } = require('apollo-server-cache-redis');
const Redis = require('ioredis');

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
        // When running locally, I need to omit these but must put back when running live
        host: isDev ? process.env.DB_HOST_DEV : process.env.DB_HOST,
        ssl: { rejectUnauthorized: false },
    },
};

const db = new Location(knexConfig);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new BaseRedisCache({
        client: new Redis(process.env.REDIS_URL, {
            tls: {
                rejectUnauthorized: false,
            },
        }),
    }),
    dataSources: () => ({
        currentLocationAPI: new CurrentLocationAPI(),
        db,
    }),
});

server.listen({ port: process.env.PORT || 4000 }).then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
});
