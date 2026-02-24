import { constants } from 'node:http2';
import { promisify } from 'node:util';
import express from 'express';
import { db } from '../../middleware/auth.js';
import { verify } from '../../utils/crypto.js';

import type { Request } from 'express';
import type { DBUser, LoginErrRes, LoginSuccessRes } from '@/shared/types/globals.js';

const errRes = (err: string): LoginErrRes => ({ status: 'error', error: err });

export default express.Router()
  .post('/', async (
    req: Request<unknown, LoginErrRes | LoginSuccessRes, { userName: string; passwordHash: string } | undefined>, res
  ) => {
    if (!req.body?.userName || !req.body.passwordHash)
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json(errRes('Missing required data in body'));

    try {
      const user = await db<{ userName: string; passwordHash: string }, DBUser>('user')
        .whereRaw('LOWER(userName) = LOWER(?)', [req.body.userName])
        .first();

      if (!user || !verify(req.body.passwordHash, user.passwordHash))
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json(errRes('Invalid login data'));

      const
        /* eslint-disable @typescript-eslint/strict-void-return, custom/unbound-method -- fine here due to bind */
        regenerate = promisify(req.session.regenerate).bind(req.session),
        save = promisify(req.session.save).bind(req.session);
        /* eslint-enable @typescript-eslint/strict-void-return, custom/unbound-method */

      try { await regenerate(); }
      catch (err) {
        console.error(err);
        return void res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(errRes('Error generating session'));
      }

      /* eslint-disable require-atomic-updates */
      req.session.userId = user.id;
      req.session.roleId = user.roleId;
      /* eslint-enable require-atomic-updates */

      try { await save(); }
      catch (err) {
        console.error(err);
        return void res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(errRes('Error saving session'));
      }

      return void res.json({ status: 'success', user: { id: user.id, userName: user.userName, roleId: user.roleId } });
    }
    catch (err) {
      console.error(err);
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(errRes('Internal Server Error'));
    }
  });