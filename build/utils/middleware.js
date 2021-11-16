"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unknownEndpoint = (_request, response) => {
    return response.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, _request, response, _next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return response.status(400).json({ error: error.message });
    // next(error);
};
exports.default = { unknownEndpoint, errorHandler };
