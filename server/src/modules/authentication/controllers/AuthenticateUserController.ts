import { Request, Response } from 'express';

import { Controller } from '@core/infra/Controller';
import { AuthenticateUser } from '../useCases/AuthenticateUser';

export class AuthenticateUserController implements Controller {
  constructor(private authenticateUser: AuthenticateUser) {}

  async handle(request: Request, response: Response) {
    const { code } = request.body;

    const result = await this.authenticateUser.execute(code);

    return response.status(200).json(result);
  }
}
