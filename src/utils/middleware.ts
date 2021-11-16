import { Request, Response } from "express";

const unknownEndpoint = (_request: Request, response: Response) => {
  return response.status(404).send({ error: 'unknown endpoint'});
};

const errorHandler = (error: Error | any, _request: Request, response: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return response.status(400).json({ error: error.message });
};

export default { unknownEndpoint, errorHandler };