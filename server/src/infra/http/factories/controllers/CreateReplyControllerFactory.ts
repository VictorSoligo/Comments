import { Controller } from '@core/infra/Controller';

import { RepliesRepository } from '@modules/comments/repositories/prisma/RepliesRepository';
import { CreateReply } from '@modules/comments/useCases/CreateReply';
import { CreateReplyController } from '@modules/comments/controllers/CreateReplyController';
import { ReplyFeedbacksRepository } from '@modules/comments/repositories/prisma/ReplyFeedbacksRepository';

export function makeCreateReplyController(): Controller {
  const repliesRepository = new RepliesRepository();
  const replyFeedbacksRepository = new ReplyFeedbacksRepository();
  const createReply = new CreateReply(
    repliesRepository,
    replyFeedbacksRepository
  );
  const createReplyController = new CreateReplyController(createReply);

  return createReplyController;
}
