import { Controller } from '@core/infra/Controller';

import { DeleteCommentController } from '@modules/comments/controllers/DeleteCommentController';
import { CommentsRepository } from '@modules/comments/repositories/prisma/CommentsRepository';
import { ReplyFeedbacksRepository } from '@modules/comments/repositories/prisma/ReplyFeedbacksRepository';
import { RepliesRepository } from '@modules/comments/repositories/prisma/RepliesRepository';
import { CommentFeedbacksRepository } from '@modules/comments/repositories/prisma/CommentFeedbacksRepository';
import { DeleteComment } from '@modules/comments/useCases/DeleteComment';

export function makeDeleteCommentController(): Controller {
  const commentsRepository = new CommentsRepository();
  const repliesRepository = new RepliesRepository();
  const replyFeedbacksRepository = new ReplyFeedbacksRepository();
  const commentFeedbacksRepository = new CommentFeedbacksRepository();
  const deleteComment = new DeleteComment(
    commentsRepository,
    repliesRepository,
    replyFeedbacksRepository,
    commentFeedbacksRepository
  );
  const deleteCommentController = new DeleteCommentController(deleteComment);

  return deleteCommentController;
}
