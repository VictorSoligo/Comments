import { IUsersRepository } from '../repositories/IUsersRepository';

export class GetUserProfile {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: string) {
    const user = await this.usersRepository.findById(user_id);

    return user;
  }
}
