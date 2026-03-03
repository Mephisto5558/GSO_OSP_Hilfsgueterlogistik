import { constants } from 'node:http2';
import { Router } from 'express';
import { db } from '../../../../middleware/auth.js';
import type { Request } from 'express';

import type { Item } from '@/shared/types/db.js';
import type {
  getItemErrRes, getItemSuccessRes, getItemsErrRes, getItemsSuccessRes
} from '@/shared/types/globals.js';

const errRes = (err: string): getItemsErrRes | getItemErrRes => ({ status: 'error', error: err });

export default Router()
  .get('/{:q}', async (
    req: Request<unknown, getItemsErrRes | getItemsSuccessRes, unknown, { q?: string }>,
    res
  ) => {
    try {
      const queryBuilder = db<Item>('item').select('*');

      if (req.query.q) queryBuilder.whereLike('description', `%${req.query.q}%`);
      const items = await queryBuilder;

      return res.json({ status: 'success', items });
    }
    catch (err) {
      console.error(err);
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(errRes('Internal Server Error'));
    }
  })
  .get('/{item}', async (
    req: Request<{ item: string }, getItemErrRes | getItemSuccessRes, unknown>, res, next
  ) => {
    try {
      const item = await db<Item>('item').where('id', '=', req.params.item).first();
      if (!item) return next(); // 404 handler

      return res.json({ status: 'success', item });
    }
    catch (err) {
      console.error(err);
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(errRes('Internal Server Error'));
    }
  });