import { Controller } from '@core/infra/Controller';

import { CommentsRepository } from '@modules/comments/repositories/prisma/CommentsRepository';
import { GetLast3Comments } from '@modules/comments/useCases/GetLast3Comments';
import { GetLast3CommentsController } from '@modules/comments/controllers/GetLast3CommentsController';

export function makeGetLast3Controller(): Controller {
  const commentsRepository = new CommentsRepository();
  const getLast3Comments = new GetLast3Comments(commentsRepository);
  const getLast3CommentsController = new GetLast3CommentsController(getLast3Comments);

  return getLast3CommentsController;
}
