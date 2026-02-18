import __ from 'dotenv/config';

const DEFAULT_PORT = 3001;

export const appConfig = {
  port: Number(process.env.BACKEND_PORT) || DEFAULT_PORT,
  defaultAPIVersion: 1
};