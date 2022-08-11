import { ICommentFeedbacksRepository } from '../repositories/ICommentFeedbacksRepository';
import { IReplyFeedbacksRepository } from '../repositories/IReplyFeedbacksRepository';

type HandleFeedbackParams = {
  user_id: string;
  isReply: boolean;
  feedback_type: 'positive' | 'negative';
  comment_id?: string;
  reply_id?: string;
};

export class HandleFeedback {
  constructor(
    private commentFeedbacksRepository: ICommentFeedbacksRepository,
    private replyFeedbacksRepository: IReplyFeedbacksRepository
  ) {}

  async execute({
    feedback_type,
    isReply,
    user_id,
    comment_id,
    reply_id,
  }: HandleFeedbackParams) {
    let errorMessage = 'You have already given a feedback';

    if (isReply) {
      const canUserGiveFeedback = await this.replyFeedbacksRepository.canUserGiveReplyFeedback({
        reply_id,
        user_id,
        feedback_type,
      });

      if (canUserGiveFeedback) {
        if (feedback_type === 'positive') {
          await this.replyFeedbacksRepository.addPositiveFeedback({
            user_id,
            reply_id,
          });
        }

        if (feedback_type === 'negative') {
          await this.replyFeedbacksRepository.addNegativeFeedback({
            user_id,
            reply_id,
          });
        }
      } else {
        return errorMessage;
      }
    }

    if (!isReply) {
      const canUserGiveFeedback =
        await this.commentFeedbacksRepository.canUserGiveCommentFeedback({
          comment_id,
          user_id,
          feedback_type,
        });

      if (canUserGiveFeedback) {
        if (feedback_type === 'positive') {
          await this.commentFeedbacksRepository.addPositiveFeedback({
            user_id,
            comment_id,
          });
        }

        if (feedback_type === 'negative') {
          await this.commentFeedbacksRepository.addNegativeFeedback({
            user_id,
            comment_id,
          });
        }
      } else {
        return errorMessage;
      }
    }
  }
}
