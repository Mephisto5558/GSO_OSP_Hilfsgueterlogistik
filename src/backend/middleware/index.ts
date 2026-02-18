import compression from 'compression';
import express from 'express';
import { xss } from 'express-xss-sanitizer';
import { authenticator } from './auth.js';
import { errorHandler } from './errorHandler.js';
import { notFound } from './notFound.js';
import { router } from './router.js';

import type { ErrorRequestHandler, RequestHandler } from 'express';

export default [
  { name: 'compression', fn: compression() },
  { name: 'json', fn: express.json() },
  { name: 'xss-sanitizer', fn: xss() },
  { name: 'authenticator', fn: authenticator },

  { name: 'router', fn: router },

  // methodNotAllowed, // such a handler is out of scope to implement due to the difficulties with a modular approach
  { name: 'notFound', fn: notFound },
  { name: 'errorHandler', fn: errorHandler }
] as { name: string; fn: RequestHandler | ErrorRequestHandler }[];