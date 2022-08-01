import { NextFunction, Request, Response } from 'express';

import { Middleware } from '@core/infra/Middleware';

import { verify } from 'jsonwebtoken';

type DecodedJwt = {
  sub: string;
};

export class EnsureAuthenticatedMiddleware implements Middleware {
  async handle(request: Request, response: Response, next: NextFunction) {
    const accessToken = request.headers.authorization;

    if (!accessToken) {
      return response.status(401).end();
    }

    try {
      const [, token] = accessToken.split(' ');

      const { sub } = verify(token, process.env.JWT_SECRET) as DecodedJwt;

      request.user_id = sub;
    } catch (eror) {
      return response.status(403).end();
    }

    return next();
  }
}
