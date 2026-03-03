import { constants } from 'node:http2';
import { Router } from 'express';
import { appConfig } from '../../../../config/index.js';

export default Router()
  .post('/', (req, res) => req.session.destroy(err => {
    if (err)
      return void res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Logout failed');

    res.clearCookie(appConfig.sessionCookieName);
    res.redirect(constants.HTTP_STATUS_TEMPORARY_REDIRECT, '/');
  }));