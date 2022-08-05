import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';

import { GetUserProfile } from '../useCases/GetUserProfile';

export class GetUserProfileController implements Controller {
  constructor(private getUserProfile: GetUserProfile) {}

  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const user = await this.getUserProfile.execute(user_id);

    return response.status(200).json(user);
  }
}
