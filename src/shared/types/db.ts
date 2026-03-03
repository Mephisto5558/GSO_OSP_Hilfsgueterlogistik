import type { Guid } from 'guid-typescript';

type DB_GUID = ReturnType<Guid['toString']> & { isGuid: true };

export type User = {
  id: number;
  userName: string;
  passwordHash: `${string}:${string}`;
  roleId: number;
};
export type UserRole = {
  id: number;
  name: string;
};

export type Box = {
  id: DB_GUID;
  description: string;
  categoryId: BoxCategory['id'] | null;
};
export type BoxCategory = {
  id: number;
  name: string;
};

export type Item = {
  id: DB_GUID;
  boxId: Box['id'];
  storageLocation: string;
  description: string;
  gtin: string | null;
  quantity: number;
  unitId: number;
  statusId: number;
  expiryDate: Date | null;
  arrivalDate: Date | null;
  issueDate: Date | null;
  returnDate: Date | null;
};
export type ItemUnit = {
  id: number;
  name: string;
};
export type ItemStatus = {
  id: number;
  name: string;
};