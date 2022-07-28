import axios from 'axios';
import { sign } from 'jsonwebtoken';

import { UsersRepository } from '../repositories/prisma/UsersRepository';

type AccessTokenResponse = {
  access_token: string;
};

type UserResponse = {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
};

export class AuthenticateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: accessToken } = await axios.post<AccessTokenResponse>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const response = await axios.get<UserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${accessToken.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, name } = response.data;

    let user = await this.usersRepository.findByGithubId(id);

    if (!user) {
      user = await this.usersRepository.create({
        login,
        id,
        avatar_url,
        name,
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_ur: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return { token, user };
  }
}
