import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
const BYTE_BIT = 8;
export function hashForDatabase(frontendHash) {
    const salt = randomBytes(BYTE_BIT * 2).toString('hex'), derivedKey = scryptSync(frontendHash, salt, BYTE_BIT ** 2);
    return `${salt}:${derivedKey.toString('hex')}`;
}
export function verify(frontendHash, storedHash) {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash)
        return false;
    const derivedKey = scryptSync(frontendHash, salt, BYTE_BIT ** 2);
    return timingSafeEqual(derivedKey, Buffer.from(hash, 'hex'));
}
//# sourceMappingURL=crypto.js.map