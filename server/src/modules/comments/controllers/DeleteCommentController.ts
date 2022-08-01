import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';
import { DeleteComment } from '../useCases/DeleteComment';

export class DeleteCommentController implements Controller {
  constructor(private deleteComment: DeleteComment) {}

  async handle(request: Request, response: Response) {
    const { comment_id } = request.body;

    await this.deleteComment.execute(comment_id);

    return response.status(200).json({ message: 'Deleted comment' });
  }
}
