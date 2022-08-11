import { Controller } from '@core/infra/Controller';

import { CommentFeedbacksRepository } from '@modules/comments/repositories/prisma/CommentFeedbacksRepository';
import { ReplyFeedbacksRepository } from '@modules/comments/repositories/prisma/ReplyFeedbacksRepository';
import { HandleFeedback } from '@modules/comments/useCases/HandleFeedback';
import { HandleFeedbackController } from '@modules/comments/controllers/HandleFeedbackController';

export function makeHandleFeedbackController(): Controller {
  const commentFeedbacksRepository = new CommentFeedbacksRepository();
  const replyFeedbacksRepository = new ReplyFeedbacksRepository();
  const handleFeedback = new HandleFeedback(
    commentFeedbacksRepository,
    replyFeedbacksRepository
  );
  const handleFeedbackController = new HandleFeedbackController(
    handleFeedback
  );

  return handleFeedbackController;
}
