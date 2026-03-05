import { Router } from 'express';
import { db } from '@/backend/middleware/auth.js';
import type { Request } from 'express';

import type { getUserErrRes, getUserSuccessRes, getUsersErrRes, getUsersSuccessRes } from '@/shared/types/api.js';
import type { User } from '@/shared/types/db.js';

export default Router()
  .get('/{:q}', async (
    req: Request<unknown, getUsersSuccessRes | getUsersErrRes, unknown, { q?: string }>,
    res
  ) => {
    const queryBuilder = db<User>('user');

    if (req.query.q) queryBuilder.whereLike('description', `%${req.query.q}%`);
    const users = await queryBuilder;

    return res.json({ status: 'success', users });
  })
  .get('/{user}', async (
    req: Request<{ user: User['id'] }, getUserSuccessRes | getUserErrRes, unknown>, res, next
  ) => {
    const user = await db<User>('user').where('id', req.params.user).first();
    if (!user) return next(); // 404 handler

    return res.json({ status: 'success', user });
  });