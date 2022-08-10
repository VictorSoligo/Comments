import { Controller } from '@core/infra/Controller';

import { CommentsRepository } from '@modules/comments/repositories/prisma/CommentsRepository';
import { CommentFeedbacksRepository } from '@modules/comments/repositories/prisma/CommentFeedbacksRepository';
import { GetComments } from '@modules/comments/useCases/GetComments';
import { GetCommentsController } from '@modules/comments/controllers/GetCommentsController';
import { ReplyFeedbacksRepository } from '@modules/comments/repositories/prisma/ReplyFeedbacksRepository';

export function makeGetCommentsController(): Controller {
  const commentsRepository = new CommentsRepository();
  const commentFeedbacksRepository = new CommentFeedbacksRepository();
  const replyFeedbacksRepository = new ReplyFeedbacksRepository();
  const getComments = new GetComments(
    commentsRepository,
    commentFeedbacksRepository,
    replyFeedbacksRepository
  );
  const getCommentsController = new GetCommentsController(getComments);

  return getCommentsController;
}
