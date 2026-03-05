import { Router } from 'express';
import { db } from '@/backend/middleware/auth.js';
import type { Request } from 'express';

import type { getItemErrRes, getItemSuccessRes, getItemsErrRes, getItemsSuccessRes } from '@/shared/types/api.js';
import type { Item } from '@/shared/types/db.js';

export default Router()
  .get('/{:q}', async (
    req: Request<unknown, getItemsErrRes | getItemsSuccessRes, unknown, { q?: string }>,
    res
  ) => {
    const queryBuilder = db<Item>('item');

    if (req.query.q) queryBuilder.whereLike('description', `%${req.query.q}%`);
    const items = await queryBuilder;

    return res.json({ status: 'success', items });
  })
  .get('/{item}', async (
    req: Request<{ item: string }, getItemErrRes | getItemSuccessRes, unknown>, res, next
  ) => {
    const item = await db<Item>('item').where('id', req.params.item).first();
    if (!item) return next(); // 404 handler

    return res.json({ status: 'success', item });
  });