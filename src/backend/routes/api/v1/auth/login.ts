import { constants } from 'node:http2';
import { promisify } from 'node:util';
import express from 'express';
import { db } from '@/backend/middleware/auth.js';
import { verify } from '@/backend/utils/crypto.js';

import type { Request } from 'express';
import type { LoginErrRes, LoginSuccessRes } from '@/shared/types/api.js';
import type { User } from '@/shared/types/db.js';

const errRes = (err: string): LoginErrRes => ({ status: 'error', error: err });

export default express.Router()
  .post('/', async (
    req: Request<unknown, LoginErrRes | LoginSuccessRes, { userName: string; passwordHash: string } | undefined>, res
  ) => {
    if (!req.body?.userName || !req.body.passwordHash)
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json(errRes('Missing required data in body'));

    const { passwordHash, ...user } = await db<User>('user')
      .where('LOWER(userName)', req.body.userName.toLowerCase())
      .first() ?? {};

    if (!('id' in user) || !passwordHash || !verify(req.body.passwordHash, passwordHash))
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json(errRes('Invalid login data'));

    const
      /* eslint-disable @typescript-eslint/strict-void-return, custom/unbound-method -- fine here due to bind */
      regenerate = promisify(req.session.regenerate).bind(req.session),
      save = promisify(req.session.save).bind(req.session);
    /* eslint-enable @typescript-eslint/strict-void-return, custom/unbound-method */

    try { await regenerate(); }
    catch (err) {
      console.error(`Error generating session for userId ${user.id}`, err);
      return void res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(errRes('Error generating session'));
    }

    /* eslint-disable require-atomic-updates */
    req.session.userId = user.id;
    req.session.roleId = user.roleId;
    /* eslint-enable require-atomic-updates */

    try { await save(); }
    catch (err) {
      console.error(`Error saving session for userId ${user.id}`, err);
      return void res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(errRes('Error saving session'));
    }

    return void res.json({ status: 'success', user });
  });