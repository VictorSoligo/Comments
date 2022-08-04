import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';

import { GetPaginatedComments } from '../useCases/GetPaginatedComments';

export class GetPaginatedCommentsController implements Controller {
  constructor(private getPaginatedComments: GetPaginatedComments) {}

  async handle(request: Request, response: Response) {
    const { page } = request.query;

    const comments = await this.getPaginatedComments.execute(Number(page));

    return response.status(200).json({ comments });
  }
}
