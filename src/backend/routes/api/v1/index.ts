import { Router } from 'express';

export default Router()
  .get('/', (_req, res) => {
    res.send('API is available');
  });