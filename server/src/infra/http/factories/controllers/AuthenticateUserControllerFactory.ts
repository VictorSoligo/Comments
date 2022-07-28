import { Controller } from '@core/infra/Controller';
import { AuthenticateUserController } from '@modules/authentication/controllers/AuthenticateUserController';
import { UsersRepository } from '@modules/authentication/repositories/prisma/UsersRepository';
import { AuthenticateUser } from '@modules/authentication/useCases/AuthenticateUser';

export function makeAuthenticateUserController(): Controller {
  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUser(usersRepository);
  const authenticateUserController = new AuthenticateUserController(authenticateUser)

  return authenticateUserController;
}
