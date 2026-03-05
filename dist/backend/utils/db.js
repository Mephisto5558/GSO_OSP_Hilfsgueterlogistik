import { db } from '../middleware/auth.js';
import { hashForDatabase } from './crypto.js';
export function createUser(userName, frontEndPwHash) {
    return void db('user')
        .insert({
        userName,
        passwordHash: hashForDatabase(frontEndPwHash)
    })
        .returning(['id', 'userName']);
}
//# sourceMappingURL=db.js.map