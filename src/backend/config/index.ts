import { config } from 'dotenv';

config();

if (!process.env.SESSION_EXPIRY_MS) throw new Error('Missing SESSION_EXPIRY_MS in env');


const DEFAULT_BACKEND_PORT = 3000;

export const appConfig = {
  port: Number(process.env.BACKEND_PORT ?? DEFAULT_BACKEND_PORT),
  defaultAPIVersion: 1,
  SessionExpiryMs: Number.parseInt(process.env.SESSION_EXPIRY_MS),
  sessionCookieName: 'connect.sid'
};

export const DB_FILE = 'database.db';