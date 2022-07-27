import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';

import { GetLast3Comments } from '../useCases/GetLast3Comments';

export class GetLast3CommentsController implements Controller {
  constructor(private getLast3Comments: GetLast3Comments) {}

  async handle(request: Request, response: Response) {
    const comments = await this.getLast3Comments.execute();

    return response.json({ comments });
  }
}
