import { prisma } from '@infra/prisma/client';

import {
  AddCommentFeedbackParams,
  CanUserGiveFeedbackParams,
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

  async deleteCommentFeedbacks(comment_id: string) {
    await prisma.commentFeedbacks.deleteMany({
      where: {
        comment_id,
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

  async canUserGiveCommentFeedback({
    comment_id,
    user_id,
    feedback_type,
  }: CanUserGiveFeedbackParams) {
    const {
      _sum: { feedback_value },
    } = await prisma.commentFeedbacks.aggregate({
      _sum: {
        feedback_value: true,
      },
      where: {
        comment_id,
        AND: {
          user_id,
        },
      },
    });

    let canGiveFeedback = false;

    if (feedback_type === 'positive' && feedback_value < 1) {
      canGiveFeedback = true;
    }

    if (feedback_type === 'negative' && feedback_value > -1) {
      canGiveFeedback = true;
    }

    return canGiveFeedback;
  }
}
