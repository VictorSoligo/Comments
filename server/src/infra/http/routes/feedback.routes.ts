import { Router } from 'express';

import { middlewareAdapter } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { routeAdapter } from '@core/infra/adapters/ExpressRouteAdapter';

import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory';

import { makeHandleFeedbackController } from '../factories/controllers/HandleFeedbackController';

export const feedbackRouter = Router();

feedbackRouter.post(
  '/',
  middlewareAdapter(makeEnsureAuthenticatedMiddleware()),
  routeAdapter(makeHandleFeedbackController())
);
