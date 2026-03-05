import { constants } from 'node:http2';
import { Router } from 'express';
import { appConfig } from '@/backend/config/index.js';

export default Router()
  .post('/', (req, res) => req.session.destroy(err => {
    if (err)
      return void res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Logout failed');

    res.clearCookie(appConfig.sessionCookieName);
    return void res.sendStatus(constants.HTTP_STATUS_OK);
  }));