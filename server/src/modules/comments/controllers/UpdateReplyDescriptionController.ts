import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';

import { UpdateReplyDescription } from '../useCases/UpdateReplyDescription';

export class UpdateReplyDescriptionController implements Controller {
  constructor(private updateReplyDescription: UpdateReplyDescription) {}

  async handle(request: Request, response: Response) {
    const { reply_id, description } = request.body;

    await this.updateReplyDescription.execute({
      description,
      reply_id,
    });

    return response
      .status(200)
      .json({ message: 'Updated comment reply description' });
  }
}
