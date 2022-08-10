import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';

import { GetComments } from '../useCases/GetComments';

export class GetCommentsController implements Controller {
  constructor(private getComments: GetComments) {}

  async handle(request: Request, response: Response) {
    const { limit: urlLimit } = request.query;

    const limit = urlLimit || Number(urlLimit) < 20 ? Number(urlLimit) : 3;

    const comments = await this.getComments.execute(limit);

    return response.status(200).json({ comments });
  }
}
