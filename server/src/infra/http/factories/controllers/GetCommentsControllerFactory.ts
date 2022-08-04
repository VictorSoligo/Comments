import { Controller } from '@core/infra/Controller';

import { CommentsRepository } from '@modules/comments/repositories/prisma/CommentsRepository';
import { GetComments } from '@modules/comments/useCases/GetComments';
import { GetCommentsController } from '@modules/comments/controllers/GetCommentsController';

export function makeGetCommentsController(): Controller {
  const commentsRepository = new CommentsRepository();
  const getComments = new GetComments(commentsRepository);
  const getCommentsController = new GetCommentsController(getComments);

  return getCommentsController;
}
