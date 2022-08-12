import { Controller } from '@core/infra/Controller';

import { DeleteReplyController } from '@modules/comments/controllers/DeleteReplyController';
import { RepliesRepository } from '@modules/comments/repositories/prisma/RepliesRepository';
import { ReplyFeedbacksRepository } from '@modules/comments/repositories/prisma/ReplyFeedbacksRepository';
import { DeleteReply } from '@modules/comments/useCases/DeleteReply';

export function makeDeleteReplyController(): Controller {
  const repliesRepository = new RepliesRepository();
  const replyFeedbacksRepository = new ReplyFeedbacksRepository();
  const deleteReply = new DeleteReply(
    repliesRepository,
    replyFeedbacksRepository
  );
  const deleteReplyController = new DeleteReplyController(deleteReply);

  return deleteReplyController;
}
