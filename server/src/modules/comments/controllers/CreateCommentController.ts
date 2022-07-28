import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';

import { CreateComment } from '../useCases/CreateComment';

export class CreateCommentController implements Controller {
  constructor(private createComment: CreateComment) {}

  async handle(request: Request, response: Response) {
    const { description, user_id } = request.body;

    await this.createComment.execute({
      description,
      user_id
    });

    return response.status(201).json({ message: 'Created comment' });
  }
}
