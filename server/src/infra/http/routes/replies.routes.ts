import { Router } from 'express';

import { routeAdapter } from '@core/infra/adapters/ExpressRouteAdapter';

import { makeCreateReplyController } from '../factories/controllers/CreateReplyControllerFactory';

export const repliesRouter = Router();

repliesRouter.post('/', routeAdapter(makeCreateReplyController()));
