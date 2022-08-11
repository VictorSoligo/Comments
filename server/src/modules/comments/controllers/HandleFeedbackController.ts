import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';
import { HandleFeedback } from '../useCases/HandleFeedback';

export class HandleFeedbackController implements Controller {
  constructor(private handleFeedback: HandleFeedback) {}

  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { isReply, feedback_type, comment_id, reply_id } = request.body;

    const hasFeedback = await this.handleFeedback.execute({
      user_id,
      isReply,
      feedback_type,
      comment_id,
      reply_id,
    });

    if (typeof hasFeedback === 'string') {
      return response.status(400).json({ message: hasFeedback });
    }

    return response.status(201).json({ message: 'Handled feedback' });
  }
}
