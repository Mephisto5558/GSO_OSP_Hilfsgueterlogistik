/* eslint-disable sonarjs/redundant-type-aliases -- for better self-documentation */

import type { Item, User } from './db.js';

type SuccessResData = string | Record<string, unknown>;
type SuccessRes<DATA extends Record<string, SuccessResData | SuccessResData[]>> = {
  status: 'success';
} & DATA;

type ErrorRes = { status: 'error'; error: string };

export type LoginSuccessRes = SuccessRes<{ user: Pick<User, 'id' | 'userName' | 'roleId'> }>;
export type LoginErrRes = ErrorRes;

export type getItemsSuccessRes = SuccessRes<{ items: Item[] }>;
export type getItemsErrRes = ErrorRes;

export type getItemSuccessRes = SuccessRes<{ item: Item }>;
export type getItemErrRes = ErrorRes;