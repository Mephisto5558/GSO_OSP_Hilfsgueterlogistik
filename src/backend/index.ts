import express from 'express';
import { disable, setting } from './config/express.js';
import { appConfig } from './config/index.js';
import middlewares from './middleware/index.js';

/* eslint-disable-next-line sonarjs/x-powered-by -- handled via `./config/express.js` */
const app = express();

for (const e of disable) app.disable(e);
for (const [k, v] of Object.entries(setting)) app.set(k, v);

for (const middleware of middlewares) {
  app.use(middleware.fn);
  console.log(`[server]: Registered middleware ${middleware.name}`);
}

app.listen(appConfig.port, () => console.log(`[server]: Server is running at http://localhost:${appConfig.port}`));

export default app;