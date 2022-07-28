import { Router } from 'express';

import { commentsRouter } from './comments.routes';
import { repliesRouter } from './replies.routes';

export const router = Router();

router.use('/comments', commentsRouter);
router.use('/replies', repliesRouter);
