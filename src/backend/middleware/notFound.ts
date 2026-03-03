import { constants } from 'node:http2';
import type { RequestHandler } from 'express';

export const notFound: RequestHandler = (_req, res) => {
  res.sendStatus(constants.HTTP_STATUS_NOT_FOUND);
};