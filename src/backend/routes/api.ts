import { constants } from 'node:http2';
import { Router } from 'express';
import { appConfig } from '../config/index.js';
import type { Request } from 'express';

/** Adds a API version to the URL if none has been specified. */
export default Router()
  .all('{/*path}', (req: Request<{ path?: string[] }>, res, next) => {
    if (!req.params.path?.[0] || /^v\d+$/.test(req.params.path[0])) return next();

    return res.redirect(
      constants.HTTP_STATUS_MOVED_PERMANENTLY,
      `/api/v${appConfig.defaultAPIVersion}/${req.params.path.join('/')}`
    );
  });