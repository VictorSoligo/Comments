import { User } from '@prisma/client';

export type CreateUserParams = {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
};

export interface IUsersRepository {
  findByGithubId: (github_id: number) => Promise<User>;
  create: (user: CreateUserParams) => Promise<User>;
}
