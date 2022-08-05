import { prisma } from '@infra/prisma/client';

import { CreateUserParams, IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  async findByGithubId(github_id: number) {
    const user = await prisma.user.findFirst({
      where: {
        github_id,
      },
    });

    return user;
  }

  async create({ avatar_url, id, login, name }: CreateUserParams) {
    const user = await prisma.user.create({
      data: {
        avatar_url,
        github_id: id,
        login,
        name,
      },
    });

    return user;
  }
}
