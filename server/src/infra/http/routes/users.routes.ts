import { Router } from 'express';

import { routeAdapter } from '@core/infra/adapters/ExpressRouteAdapter';
import { middlewareAdapter } from '@core/infra/adapters/ExpressMiddlewareAdapter';

import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory';

import { makeAuthenticateUserController } from '../factories/controllers/AuthenticateUserControllerFactory';
import { makeGetUserProfileController } from '../factories/controllers/GetUserProfileControllerFactory';

export const usersRouter = Router();

usersRouter.post(
  '/',
  routeAdapter(makeAuthenticateUserController())
);
usersRouter.get(
  '/profile',
  middlewareAdapter(makeEnsureAuthenticatedMiddleware()),
  routeAdapter(makeGetUserProfileController())
);
