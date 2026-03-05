import { constants } from 'node:http2';
import type { RequestHandler } from 'express';
import type { ErrorRes } from '@/shared/types/api.js';

export const notFound: RequestHandler<unknown, ErrorRes> = (req, res) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({
      status: 'error', error: `Either this route does not exist or it does not handle "${req.method}" requests.`
    });
};