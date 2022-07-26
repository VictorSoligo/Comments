import { Router } from 'express';

import { commentsRouter } from './comments.routes';
import { repliesRouter } from './replies.routes';
import { usersRouter } from './users.routes';
import { feedbackRouter } from './feedback.routes';

export const router = Router();

router.use('/comments', commentsRouter);
router.use('/replies', repliesRouter);
router.use('/authenticate', usersRouter);
router.use('/feedbacks', feedbackRouter);
