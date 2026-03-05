import { constants } from 'node:http2';
import type { ErrorRequestHandler } from 'express';
import type { ErrorRes } from '@/shared/types/api.js';

export const errorHandler: ErrorRequestHandler<unknown, ErrorRes> = (err: unknown, _req, res) => {
  console.error(err);

  res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .json({ status: 'error', error: String(err) });
};