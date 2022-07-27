import { Router } from 'express';

import { commentsRouter } from './comments.routes';

export const router = Router();

router.use('/comments', commentsRouter);

