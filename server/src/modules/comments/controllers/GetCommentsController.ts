import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';

import { GetComments } from '../useCases/GetComments';

export class GetCommentsController implements Controller {
  constructor(private getComments: GetComments) {}

  async handle(request: Request, response: Response) {
    const { limit } = request.query;

    const comments = await this.getComments.execute(Number(limit));

    return response.status(200).json({ comments });
  }
}
