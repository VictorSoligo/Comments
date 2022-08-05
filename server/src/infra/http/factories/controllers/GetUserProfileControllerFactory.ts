import { Controller } from '@core/infra/Controller';
import { GetUserProfileController } from '@modules/authentication/controllers/GetUserProfileController';
import { UsersRepository } from '@modules/authentication/repositories/prisma/UsersRepository';
import { GetUserProfile } from '@modules/authentication/useCases/GetUserProfile';

export function makeGetUserProfileController(): Controller {
  const usersRepository = new UsersRepository();
  const getUserProfile = new GetUserProfile(usersRepository);
  const getUserProfileController = new GetUserProfileController(getUserProfile);

  return getUserProfileController;
}
