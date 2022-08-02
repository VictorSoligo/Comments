import { Controller } from '@core/infra/Controller';
import { Request, Response } from 'express';
import { UpdateCommentDescription } from '../useCases/UpdateCommentDescription';

export class UpdateCommentDescriptionController implements Controller {
  constructor(private updateCommentDescription: UpdateCommentDescription) {}

  async handle(request: Request, response: Response) {
    const { comment_id, description } = request.body;

    await this.updateCommentDescription.execute({
      comment_id,
      description,
    });

    return response
      .status(200)
      .json({ message: 'Updated comment description' });
  }
}
