import { IRepliesRepository } from '../repositories/IRepliesRepository';
import { IReplyFeedbacksRepository } from '../repositories/IReplyFeedbacksRepository';

export class DeleteReply {
  constructor(
    private repliesRepository: IRepliesRepository,
    private replyFeedbacksRepository: IReplyFeedbacksRepository
  ) {}

  async execute(reply_id: string) {
    await this.replyFeedbacksRepository.deleteReplyFeedbacks(reply_id);

    await this.repliesRepository.delete(reply_id);
  }
}
