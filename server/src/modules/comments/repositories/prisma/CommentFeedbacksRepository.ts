import { prisma } from '@infra/prisma/client';

import {
  AddCommentFeedbackParams,
  GetCommentsFeedbackData,
  ICommentFeedbacksRepository,
} from '../ICommentFeedbacksRepository';

export class CommentFeedbacksRepository implements ICommentFeedbacksRepository {
  async getCommentsFeedback(comments_id: string[]) {
    let ids = '';

    comments_id.forEach((id, index) => {
      if (index === 0) {
        ids += `"${id}"`;
      } else {
        ids += ` OR comment_id = "${id}"`;
      }
    });

    const feedbacksSum: GetCommentsFeedbackData[] =
      await prisma.$queryRawUnsafe(`
        SELECT sum(feedback_value) as likes, comment_id
          FROM comments_feedbacks
          WHERE comment_id = ${ids}
        GROUP BY comment_id
      `);

    return feedbacksSum;
  }

  async createFirstCommentFeedback({
    comment_id,
    user_id,
  }: AddCommentFeedbackParams) {
    await prisma.commentFeedbacks.create({
      data: {
        feedback_value: 0,
        comment_id,
        user_id,
      },
    });
  }

  async addPositiveFeedback({ comment_id, user_id }: AddCommentFeedbackParams) {
    await prisma.commentFeedbacks.create({
      data: {
        feedback_value: 1,
        comment_id,
        user_id,
      },
    });
  }

  async addNegativeFeedback({ comment_id, user_id }: AddCommentFeedbackParams) {
    await prisma.commentFeedbacks.create({
      data: {
        feedback_value: -1,
        comment_id,
        user_id,
      },
    });
  }
}
