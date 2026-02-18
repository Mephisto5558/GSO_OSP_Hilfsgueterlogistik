import { constants } from 'node:http2';
import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.sendStatus(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
};