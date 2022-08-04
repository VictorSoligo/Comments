import { Controller } from '@core/infra/Controller';

import { CommentsRepository } from '@modules/comments/repositories/prisma/CommentsRepository';
import { GetPaginatedComments } from '@modules/comments/useCases/GetPaginatedComments';
import { GetPaginatedCommentsController } from '@modules/comments/controllers/GetPaginatedComments';

export function makeGetPaginatedCommentsController(): Controller {
  const commentsRepository = new CommentsRepository();
  const getPaginatedComments = new GetPaginatedComments(commentsRepository);
  const getPaginatedCommentsController = new GetPaginatedCommentsController(getPaginatedComments);

  return getPaginatedCommentsController;
}
