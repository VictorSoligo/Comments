import { Controller } from '@core/infra/Controller';

import { CommentsRepository } from '@modules/comments/repositories/prisma/CommentsRepository';
import { ReplyFeedbacksRepository } from '@modules/comments/repositories/prisma/ReplyFeedbacksRepository';
import { CommentFeedbacksRepository } from '@modules/comments/repositories/prisma/CommentFeedbacksRepository';
import { GetPaginatedComments } from '@modules/comments/useCases/GetPaginatedComments';
import { GetPaginatedCommentsController } from '@modules/comments/controllers/GetPaginatedComments';

export function makeGetPaginatedCommentsController(): Controller {
  const commentsRepository = new CommentsRepository();
  const commentLikesRepository = new CommentFeedbacksRepository();
  const replyFeedbacksRepository = new ReplyFeedbacksRepository();
  const getPaginatedComments = new GetPaginatedComments(
    commentsRepository,
    commentLikesRepository,
    replyFeedbacksRepository
  );
  const getPaginatedCommentsController = new GetPaginatedCommentsController(
    getPaginatedComments
  );

  return getPaginatedCommentsController;
}
