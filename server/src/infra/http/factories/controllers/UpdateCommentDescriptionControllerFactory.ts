import { Controller } from '@core/infra/Controller';

import { CommentsRepository } from '@modules/comments/repositories/prisma/CommentsRepository';
import { UpdateCommentDescription } from '@modules/comments/useCases/UpdateCommentDescription';
import { UpdateCommentDescriptionController } from '@modules/comments/controllers/UpdateCommentDescriptionController';

export function makeUpdateCommentDescriptionController(): Controller {
  const commentsRepository = new CommentsRepository();
  const updateCommentDescription = new UpdateCommentDescription(
    commentsRepository
  );
  const updateCommentDescriptionController = new UpdateCommentDescriptionController(
    updateCommentDescription
  );

  return updateCommentDescriptionController;
}
