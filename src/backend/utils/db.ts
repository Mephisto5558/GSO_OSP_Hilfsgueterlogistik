import { db } from '../middleware/auth.js';
import { hashForDatabase } from './crypto.js';

export function createUser(userName: string, frontEndPwHash: string): void {
  return void db('user')
    .insert({
      userName,
      passwordHash: hashForDatabase(frontEndPwHash)
    })
    .returning(['id', 'userName']);
}