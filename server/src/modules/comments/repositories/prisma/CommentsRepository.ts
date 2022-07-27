import { prisma } from '@infra/prisma/client'

import { ICommentsRepository, CreateCommentParams } from '../ICommentsRepository';

export class CommentsRepository implements ICommentsRepository {

  async getLast3() {
    const comments = await prisma.comment.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: 3,
      select: {
        id: true,
        description: true,
        likes: true,
        created_at: true,
        user_id: true,
      }
    });

    return comments;
  }

  async create({ description, user_id }: CreateCommentParams) {
    await prisma.comment.create({
      data: {
        description,
        user_id
      },
    });
  }
}
