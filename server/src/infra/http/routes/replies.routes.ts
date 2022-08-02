import { Router } from 'express';

import { middlewareAdapter } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { routeAdapter } from '@core/infra/adapters/ExpressRouteAdapter';

import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory';

import { makeCreateReplyController } from '../factories/controllers/CreateReplyControllerFactory';
import { makeDeleteReplyController } from '../factories/controllers/DeleteReplyControllerFactory';
import { makeUpdateReplyDescriptionController } from '../factories/controllers/UpdateReplyDescriptionControllerFactory';

export const repliesRouter = Router();

repliesRouter.post(
  '/',
  middlewareAdapter(makeEnsureAuthenticatedMiddleware()),
  routeAdapter(makeCreateReplyController())
);
repliesRouter.delete(
  '/',
  middlewareAdapter(makeEnsureAuthenticatedMiddleware()),
  routeAdapter(makeDeleteReplyController())
);
repliesRouter.put(
  '/',
  // middlewareAdapter(makeEnsureAuthenticatedMiddleware()),
  routeAdapter(makeUpdateReplyDescriptionController())
);
