import { prisma } from '@infra/prisma/client';

import {
  CreateReplyParams,
  IRepliesRepository,
  UpdateReplyDescriptionParams,
} from '../IRepliesRepository';

export class RepliesRepository implements IRepliesRepository {
  async create({
    comment_id,
    description,
    referenced_user,
    user_id,
  }: CreateReplyParams) {
    const { id } = await prisma.reply.create({
      data: {
        description,
        referenced_user,
        user_id,
        comment_id,
      },
      select: {
        id: true,
      },
    });

    return id;
  }

  async delete(id: string) {
    await prisma.reply.delete({
      where: {
        id,
      },
    });
  }

  async updateReplyDescription({
    description,
    reply_id,
  }: UpdateReplyDescriptionParams) {
    await prisma.reply.update({
      where: {
        id: reply_id,
      },
      data: {
        description,
      },
    });
  }
}
