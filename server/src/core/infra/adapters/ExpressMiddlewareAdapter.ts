import { Request, Response, NextFunction } from 'express';

import { Middleware } from '../Middleware';

export const middlewareAdapter = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
      await middleware.handle(request, response, next);
  }
}
