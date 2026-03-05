import { ConnectSessionKnexStore } from 'connect-session-knex';
import session from 'express-session';
import knexConstructor from 'knex';
import { DB_FILE, appConfig } from '../config/index.js';
if (!process.env.SESSION_SECRET)
    throw new Error('Missing SESSION_SECRET in .env');
export const db = knexConstructor({
    client: 'better-sqlite3',
    connection: { filename: DB_FILE },
    useNullAsDefault: true
});
const store = new ConnectSessionKnexStore({
    knex: db,
    tableName: 'sessions',
    cleanupInterval: appConfig.SessionExpiryMs
});
/* eslint-disable-next-line sonarjs/insecure-cookie -- only local server */
export const authenticator = session({
    store,
    name: appConfig.sessionCookieName,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: appConfig.SessionExpiryMs,
        secure: false,
        httpOnly: true
    }
});
//# sourceMappingURL=auth.js.map