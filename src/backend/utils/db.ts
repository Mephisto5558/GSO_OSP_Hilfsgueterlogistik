import { hashForDatabase } from './crypto.js';
import { db } from '@/backend/middleware/auth.js';

export function createUser(userName: string, frontEndPwHash: string): void {
  return void db('user')
    .insert({
      userName,
      passwordHash: hashForDatabase(frontEndPwHash)
    })
    .returning(['id', 'userName']);
}