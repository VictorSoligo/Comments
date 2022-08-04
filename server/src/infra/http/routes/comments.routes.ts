import { Router } from 'express';

import { middlewareAdapter } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { routeAdapter } from '@core/infra/adapters/ExpressRouteAdapter';

import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory';

import { makeCreateCommentController } from '@infra/http/factories/controllers/CreateCommentControllerFactory';
import { makeGetCommentsController } from '@infra/http/factories/controllers/GetCommentsControllerFactory';
import { makeDeleteCommentController } from '@infra/http/factories/controllers/DeleteCommentControllerFactory';
import { makeUpdateCommentDescriptionController } from '../factories/controllers/UpdateCommentDescriptionControllerFactory';
import { makeGetPaginatedCommentsController } from '../factories/controllers/GetPaginatedCommentsFactory';

export const commentsRouter = Router();

commentsRouter.get('/', routeAdapter(makeGetCommentsController()));
commentsRouter.get('/paginated', routeAdapter(makeGetPaginatedCommentsController()));
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
commentsRouter.put(
  '/',
  middlewareAdapter(makeEnsureAuthenticatedMiddleware()),
  routeAdapter(makeUpdateCommentDescriptionController()),
);
