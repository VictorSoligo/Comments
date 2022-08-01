import { Controller } from '@core/infra/Controller';

import { DeleteReplyController } from '@modules/comments/controllers/DeleteReplyController';
import { RepliesRepository } from '@modules/comments/repositories/prisma/RepliesRepository';
import { DeleteReply } from '@modules/comments/useCases/DeleteReply';

export function makeDeleteReplyController(): Controller {
  const repliesRepository = new RepliesRepository();
  const deleteReply = new DeleteReply(repliesRepository);
  const deleteReplyController = new DeleteReplyController(deleteReply);

  return deleteReplyController;
}
