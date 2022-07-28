import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';

import { CreateReply } from '../useCases/CreateReply';

export class CreateReplyController implements Controller {
  constructor(private createReply: CreateReply) {}

  async handle(request: Request, response: Response) {
    const {
      comment_id,
      description,
      referenced_user,
      user_id,
    } = request.body;

    await this.createReply.execute({
      comment_id,
      description,
      referenced_user,
      user_id,
    });

    return response.status(201).json({ message: 'Created reply' });
  }
}
