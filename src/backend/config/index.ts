import { config } from 'dotenv';

config();

if (!process.env.SESSION_EXPIRY_MS) throw new Error('Missing SESSION_EXPIRY_MS in env');


const DEFAULT_PORT = 3001;

export const appConfig = {
  port: Number(process.env.BACKEND_PORT) || DEFAULT_PORT,
  defaultAPIVersion: 1,
  SessionExpiryMs: Number.parseInt(process.env.SESSION_EXPIRY_MS),
  sessionCookieName: 'connect.sid'
};

export const DB_FILE = 'database.db';