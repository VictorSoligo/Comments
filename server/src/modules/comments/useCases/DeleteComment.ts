import { ICommentFeedbacksRepository } from '../repositories/ICommentFeedbacksRepository';
import { ICommentsRepository } from '../repositories/ICommentsRepository';
import { IRepliesRepository } from '../repositories/IRepliesRepository';
import { IReplyFeedbacksRepository } from '../repositories/IReplyFeedbacksRepository';

export class DeleteComment {
  constructor(
    private commentsRepository: ICommentsRepository,
    private repliesRepository: IRepliesRepository,
    private replyFeedbacksRepository: IReplyFeedbacksRepository,
    private commentFeedbacksRepository: ICommentFeedbacksRepository
  ) {}

  async execute(comment_id: string) {
    const hasReplies = await this.commentsRepository.hasReplies(comment_id);

    if (hasReplies) {
      await this.replyFeedbacksRepository.deleteCommentRepliesFeedbacks(
        comment_id
      );

      await this.repliesRepository.deleteCommentReplies(comment_id);
    }

    await this.commentFeedbacksRepository.deleteCommentFeedbacks(comment_id);

    await this.commentsRepository.delete(comment_id);
  }
}
