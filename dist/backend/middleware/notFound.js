import { constants } from 'node:http2';
export const notFound = (_req, res) => {
    res.sendStatus(constants.HTTP_STATUS_NOT_FOUND);
};
//# sourceMappingURL=notFound.js.map