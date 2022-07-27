import { Controller } from '@core/infra/Controller';

import { CommentsRepository } from '@modules/comments/repositories/prisma/CommentsRepository';
import { CreateComment } from '@modules/comments/useCases/CreateComment';
import { CreateCommentController } from '@modules/comments/controllers/CreateCommentController';

export function makeCreateUserController(): Controller {
  const commentsRepository = new CommentsRepository();
  const createComment = new CreateComment(commentsRepository);
  const createCommentController = new CreateCommentController(createComment);

  return createCommentController;
}
