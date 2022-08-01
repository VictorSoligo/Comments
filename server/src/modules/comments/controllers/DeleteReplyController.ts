import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';
import { DeleteReply } from '../useCases/DeleteReply';

export class DeleteReplyController implements Controller {
  constructor(private deleteReply: DeleteReply) {}

  async handle(request: Request, response: Response) {
    const { reply_id } = request.body;

    await this.deleteReply.execute(reply_id);

    return response.status(200).json({ message: 'Deleted reply' });
  }
}
