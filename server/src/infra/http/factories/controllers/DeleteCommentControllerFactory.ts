import { Controller } from '@core/infra/Controller';

import { DeleteCommentController } from '@modules/comments/controllers/DeleteCommentController';
import { CommentsRepository } from '@modules/comments/repositories/prisma/CommentsRepository';
import { DeleteComment } from '@modules/comments/useCases/DeleteComment';

export function makeDeleteCommentController(): Controller {
  const commentsRepository = new CommentsRepository();
  const deleteComment = new DeleteComment(commentsRepository);
  const deleteCommentController = new DeleteCommentController(deleteComment);

  return deleteCommentController;
}
