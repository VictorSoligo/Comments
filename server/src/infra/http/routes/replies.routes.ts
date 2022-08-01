import { Router } from 'express';

import { routeAdapter } from '@core/infra/adapters/ExpressRouteAdapter';

import { makeCreateReplyController } from '../factories/controllers/CreateReplyControllerFactory';
import { makeDeleteReplyController } from '../factories/controllers/DeleteReplyControllerFactory';

export const repliesRouter = Router();

repliesRouter.post('/', routeAdapter(makeCreateReplyController()));
repliesRouter.delete('/', routeAdapter(makeDeleteReplyController()));

