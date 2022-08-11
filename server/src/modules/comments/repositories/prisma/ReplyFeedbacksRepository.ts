import { prisma } from '@infra/prisma/client';

import {
  IReplyFeedbacksRepository,
  GetRepliesFeedbackData,
  AddReplyFeedbackParams,
  CanUserGiveFeedbackParams,
} from '../IReplyFeedbacksRepository';

export class ReplyFeedbacksRepository implements IReplyFeedbacksRepository {
  async getRepliesFeedback(comments_id: string[]) {
    let ids = '';

    comments_id.forEach((id, index) => {
      if (index === 0) {
        ids += `"${id}"`;
      } else {
        ids += ` OR reply_id = "${id}"`;
      }
    });

    const feedbacksSum: GetRepliesFeedbackData[] =
      await prisma.$queryRawUnsafe(`
        SELECT sum(feedback_value) as likes, reply_id
          FROM replies_feedbacks
          WHERE reply_id = ${ids}
        GROUP BY reply_id
      `);

    return feedbacksSum;
  }

  async createFirstReplyFeedback({
    reply_id,
    user_id,
  }: AddReplyFeedbackParams) {
    await prisma.replyFeedbacks.create({
      data: {
        feedback_value: 0,
        reply_id,
        user_id,
      },
    });
  }

  async addPositiveFeedback({ reply_id, user_id }: AddReplyFeedbackParams) {
    await prisma.replyFeedbacks.create({
      data: {
        feedback_value: 1,
        reply_id,
        user_id,
      },
    });
  }

  async addNegativeFeedback({ reply_id, user_id }: AddReplyFeedbackParams) {
    await prisma.replyFeedbacks.create({
      data: {
        feedback_value: -1,
        reply_id,
        user_id,
      },
    });
  }

  async canUserGiveReplyFeedback({
    feedback_type,
    reply_id,
    user_id,
  }: CanUserGiveFeedbackParams) {
    const { _sum: { feedback_value }} = await prisma.replyFeedbacks.aggregate({
      _sum: {
        feedback_value: true,
      },
      where: {
        reply_id,
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
