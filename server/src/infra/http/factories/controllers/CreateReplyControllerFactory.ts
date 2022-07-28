import { Controller } from '@core/infra/Controller';

import { RepliesRepository } from '@modules/comments/repositories/prisma/RepliesRepository';
import { CreateReply } from '@modules/comments/useCases/CreateReply';
import { CreateReplyController } from '@modules/comments/controllers/CreateReplyController';

export function makeCreateReplyController(): Controller {
  const repliesRepository = new RepliesRepository();
  const createReply = new CreateReply(repliesRepository);
  const createReplyController = new CreateReplyController(createReply);

  return createReplyController;
}
