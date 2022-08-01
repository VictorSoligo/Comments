import { prisma } from '@infra/prisma/client';

import { CreateReplyParams, IRepliesRepository } from '../IRepliesRepository';

export class RepliesRepository implements IRepliesRepository {
  async create({
    comment_id,
    description,
    referenced_user,
    user_id,
  }: CreateReplyParams) {
    await prisma.reply.create({
      data: {
        description,
        referenced_user,
        user_id,
        comment_id,
      },
    });
  }

  async delete(id: string) {
    await prisma.reply.delete({
      where: {
        id,
      },
    });
  }
}
