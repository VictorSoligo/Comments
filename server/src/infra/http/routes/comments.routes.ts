import { Router } from 'express';

import { routeAdapter } from '@core/infra/adapters/ExpressRouteAdapter';

import { makeCreateUserController } from '@infra/http/factories/controllers/CreateCommentControllerFactory';

export const commentsRouter = Router();

commentsRouter.post('/', routeAdapter(makeCreateUserController()));
