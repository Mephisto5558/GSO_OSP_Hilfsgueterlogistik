import knexConstructor from 'knex';
export declare const db: knexConstructor.Knex<any, unknown[]>;
export declare const authenticator: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
