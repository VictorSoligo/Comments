import { Router } from 'express';

import { middlewareAdapter } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { routeAdapter } from '@core/infra/adapters/ExpressRouteAdapter';

import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory';

import { makeCreateCommentController } from '@infra/http/factories/controllers/CreateCommentControllerFactory';
import { makeGetLast3Controller } from '@infra/http/factories/controllers/GetLast3CommentsControllerFactory';
import { makeDeleteCommentController } from '@infra/http/factories/controllers/DeleteCommentControllerFactory';

export const commentsRouter = Router();

commentsRouter.get('/', routeAdapter(makeGetLast3Controller()));
commentsRouter.post(
  '/',
  middlewareAdapter(makeEnsureAuthenticatedMiddleware()),
  routeAdapter(makeCreateCommentController())
);
commentsRouter.delete(
  '/',
  middlewareAdapter(makeEnsureAuthenticatedMiddleware()),
  routeAdapter(makeDeleteCommentController())
);
