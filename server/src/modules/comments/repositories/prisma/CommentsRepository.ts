import { prisma } from '@infra/prisma/client';

import {
  ICommentsRepository,
  CreateCommentParams,
} from '../ICommentsRepository';

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
            likes: true,
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
    await prisma.comment.create({
      data: {
        description,
        user_id,
      },
    });
  }

  async delete(id: string) {
    await prisma.comment.delete({
      where: {
        id,
      }
    });
  }

  async deleteCommentReplies(id: string) {
    await prisma.reply.deleteMany({
      where: {
        comment_id: id,
      }
    });
  }

  async hasReplies(id: string) {
    const replies = await prisma.comment.findMany({
      where: {
        id
      },
      select: {
        replies: {
          select: {
            id: true,
          }
        }
      }
    });

    if (replies.length > 0) {
      return true;
    }

    return false;
  }
}
