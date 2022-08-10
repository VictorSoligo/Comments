import { prisma } from '@infra/prisma/client';

import {
  ICommentsRepository,
  CreateCommentParams,
  UpdateCommentDescriptionParams,
} from '../ICommentsRepository';

export class CommentsRepository implements ICommentsRepository {
  async get(take?: number) {
    const comments = await prisma.comment.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take,
      select: {
        id: true,
        description: true,
        created_at: true,
        user: {
          select: {
            avatar_url: true,
            id: true,
            name: true,
            login: true,
          },
        },
        replies: {
          select: {
            id: true,
            referenced_user: true,
            description: true,
            created_at: true,
            comment_id: true,
            user: {
              select: {
                avatar_url: true,
                id: true,
                name: true,
                login: true,
              },
            },
          },
        },
      },
    });

    return comments;
  }

  async getPaginated(page: number) {
    let skip = (page - 1) * 6;
    let take = 6;

    if (page === 0) {
      skip = 0;
      take = 3;
    }

    if (page === 1) {
      skip = 3;
      take = 3;
    }

    const comments = await prisma.comment.findMany({
      orderBy: {
        created_at: 'desc',
      },
      skip,
      take,
      select: {
        id: true,
        description: true,
        created_at: true,
        user: {
          select: {
            avatar_url: true,
            id: true,
            name: true,
            login: true,
          },
        },
        replies: {
          select: {
            id: true,
            referenced_user: true,
            description: true,
            created_at: true,
            comment_id: true,
            user: {
              select: {
                avatar_url: true,
                id: true,
                name: true,
                login: true,
              },
            },
          },
        },
      },
    });

    return comments;
  }

  async create({ description, user_id }: CreateCommentParams) {
    const { id } = await prisma.comment.create({
      data: {
        description,
        user_id,
      },
      select: {
        id: true,
      }
    });

    return id;
  }

  async delete(id: string) {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
  }

  async deleteCommentReplies(id: string) {
    await prisma.reply.deleteMany({
      where: {
        comment_id: id,
      },
    });
  }

  async hasReplies(id: string) {
    const replies = await prisma.comment.findMany({
      where: {
        id,
      },
      select: {
        replies: {
          select: {
            id: true,
          },
        },
      },
    });

    if (replies.length > 0) {
      return true;
    }

    return false;
  }

  async updateCommentDescription({
    comment_id,
    description,
  }: UpdateCommentDescriptionParams) {
    await prisma.comment.update({
      where: {
        id: comment_id,
      },
      data: {
        description,
      },
    });
  }
}
