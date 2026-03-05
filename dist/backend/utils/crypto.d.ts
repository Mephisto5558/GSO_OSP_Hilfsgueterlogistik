import type { DBUser } from '@/shared/types/globals.js';
export declare function hashForDatabase(frontendHash: string): DBUser['passwordHash'];
export declare function verify(frontendHash: string, storedHash: string): boolean;
