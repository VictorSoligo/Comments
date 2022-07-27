import { prisma } from '@infra/prisma/client'

import { ICommentsRepository, CreateCommentParams } from '../ICommentsRepository';

export class CommentsRepository implements ICommentsRepository {
  async create({ description, user_id }: CreateCommentParams) {
    await prisma.comment.create({
      data: {
        description,
        user_id
      },
    });
  }
}
