import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import type { DBUser } from '@/shared/types/globals.js';

const BYTE_BIT = 8;

export function hashForDatabase(frontendHash: string): DBUser['passwordHash'] {
  const
    salt = randomBytes(BYTE_BIT * 2).toString('hex'),
    derivedKey = scryptSync(frontendHash, salt, BYTE_BIT ** 2);

  return `${salt}:${derivedKey.toString('hex')}`;
}

export function verify(frontendHash: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;

  const derivedKey = scryptSync(frontendHash, salt, BYTE_BIT ** 2);
  return timingSafeEqual(derivedKey, Buffer.from(hash, 'hex'));
}