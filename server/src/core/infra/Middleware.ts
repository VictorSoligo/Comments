import { NextFunction, Request, Response } from 'express';

export interface Middleware {
  handle: (request: Request, response: Response, next: NextFunction) => any;
}
