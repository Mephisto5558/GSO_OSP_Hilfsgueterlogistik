export type DBUser = {
    id: number;
    userName: string;
    passwordHash: `${string}:${string}`;
    roleId: number;
};
export type LoginSuccessRes = {
    status: 'success';
    user: Pick<DBUser, 'id' | 'userName' | 'roleId'>;
};
export type LoginErrRes = {
    status: 'error';
    error: string;
};
