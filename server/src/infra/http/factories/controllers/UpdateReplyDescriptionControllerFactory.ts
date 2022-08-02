import { Controller } from '@core/infra/Controller';

import { RepliesRepository } from '@modules/comments/repositories/prisma/RepliesRepository';
import { UpdateReplyDescription } from '@modules/comments/useCases/UpdateReplyDescription';
import { UpdateReplyDescriptionController } from '@modules/comments/controllers/UpdateReplyDescriptionController';

export function makeUpdateReplyDescriptionController(): Controller {
  const repliesRepository = new RepliesRepository();
  const updateReplyDescription = new UpdateReplyDescription(repliesRepository);
  const updateReplyDescriptionController = new UpdateReplyDescriptionController(
    updateReplyDescription
  );

  return updateReplyDescriptionController;
}
