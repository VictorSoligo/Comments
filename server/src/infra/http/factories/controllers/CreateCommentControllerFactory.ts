import { Controller } from '@core/infra/Controller';

import { CommentsRepository } from '@modules/comments/repositories/prisma/CommentsRepository';
import { CommentFeedbacksRepository } from '@modules/comments/repositories/prisma/CommentFeedbacksRepository';
import { CreateComment } from '@modules/comments/useCases/CreateComment';
import { CreateCommentController } from '@modules/comments/controllers/CreateCommentController';

export function makeCreateCommentController(): Controller {
  const commentsRepository = new CommentsRepository();
  const commentFeedbacksRepository = new CommentFeedbacksRepository();
  const createComment = new CreateComment(
    commentsRepository,
    commentFeedbacksRepository
  );
  const createCommentController = new CreateCommentController(createComment);

  return createCommentController;
}
