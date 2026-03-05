import { constants } from 'node:http2';
import { Router } from 'express';
import { appConfig } from '@/backend/config/index.js';

export default Router()
  .post('/', (req, res, next) => req.session.destroy(err => {
    if (err) return next(err); // errorHandler

    res.clearCookie(appConfig.sessionCookieName);
    return void res.sendStatus(constants.HTTP_STATUS_OK);
  }));