import { Router } from 'express';

import { routeAdapter } from '@core/infra/adapters/ExpressRouteAdapter';

import { makeAuthenticateUserController } from '../factories/controllers/AuthenticateUserControllerFactory';

export const usersRouter = Router();

usersRouter.post(
  '/',
  routeAdapter(makeAuthenticateUserController())
);
