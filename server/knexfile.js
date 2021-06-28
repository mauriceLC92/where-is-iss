require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';
module.exports = {
    development: {
        client: 'pg',
        connection: {
            user: isDev ? process.env.DB_USER_DEV : process.env.DB_USER,
            database: isDev
                ? process.env.DB_DATABASE_DEV
                : process.env.DB_DATABASE,
            password: isDev
                ? process.env.DB_PASSWORD_DEV
                : process.env.DB_PASSWORD,
            port: isDev ? process.env.DB_PORT_DEV : process.env.DB_PORT,
            // When running locally, I need to omit these but must put back when running live
            host: isDev ? process.env.DB_HOST : process.env.DB_HOST_DEV,
            ssl: { rejectUnauthorized: false },
        },
        // connection: {
        //     user: isDev ? process.env.DB_USER_DEV : process.env.DB_USER,
        //     database: isDev
        //         ? process.env.DB_DATABASE_DEV
        //         : process.env.DB_DATABASE,
        //     password: isDev
        //         ? process.env.DB_PASSWORD_DEV
        //         : process.env.DB_PASSWORD,
        //     port: isDev ? process.env.DB_PORT_DEV : process.env.DB_PORT,
        //     host: process.env.DB_HOST_DEV,
        //     ssl: { rejectUnauthorized: false },
        // },
    },
};
