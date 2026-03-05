import { constants } from 'node:http2';
export const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    res.sendStatus(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
};
//# sourceMappingURL=errorHandler.js.map