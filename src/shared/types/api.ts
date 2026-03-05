/* eslint-disable sonarjs/redundant-type-aliases -- for better self-documentation */

import type { Item, User } from './db.js';

type Prettify<T> = { [K in keyof T]: T[K]; } & {};

type SuccessResData = string | Record<string, unknown>;
type SuccessRes<DATA extends Record<string, SuccessResData | SuccessResData[]>> = Prettify<{
  status: 'success';
} & DATA>;

export type ErrorRes = { status: 'error'; error: string };

export type LoginSuccessRes = SuccessRes<{ user: Pick<User, 'id' | 'userName' | 'roleId'> }>;
export type LoginErrRes = ErrorRes;

export type getItemsSuccessRes = SuccessRes<{ items: Item[] }>;
export type getItemsErrRes = ErrorRes;

export type getItemSuccessRes = SuccessRes<{ item: Item }>;
export type getItemErrRes = ErrorRes;


export type getUsersSuccessRes = SuccessRes<{ users: User[] }>;
export type getUsersErrRes = ErrorRes;

export type getUserSuccessRes = SuccessRes<{ user: User }>;
export type getUserErrRes = ErrorRes;