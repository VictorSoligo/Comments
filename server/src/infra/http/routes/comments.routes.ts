import { Router } from 'express';

import { routeAdapter } from '@core/infra/adapters/ExpressRouteAdapter';

import { makeCreateCommentController } from '@infra/http/factories/controllers/CreateCommentControllerFactory';
import { makeGetLast3Controller } from '@infra/http/factories/controllers/GetLast3CommentsControllerFactory';

export const commentsRouter = Router();

commentsRouter.get('/', routeAdapter(makeGetLast3Controller()));
commentsRouter.post('/', routeAdapter(makeCreateCommentController()));
