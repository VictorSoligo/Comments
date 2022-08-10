import { CreateReplyParams } from '../repositories/IRepliesRepository';
import { IReplyFeedbacksRepository } from '../repositories/IReplyFeedbacksRepository';
import { RepliesRepository } from '../repositories/prisma/RepliesRepository';

export class CreateReply {
  constructor(
    private repliesRepository: RepliesRepository,
    private replyFeedbacksRepository: IReplyFeedbacksRepository
  ) {}

  async execute({
    comment_id,
    description,
    referenced_user,
    user_id,
  }: CreateReplyParams) {
     const reply_id = await this.repliesRepository.create({
      comment_id,
      description,
      referenced_user,
      user_id,
    });

    await this.replyFeedbacksRepository.createFirstReplyFeedback({
      user_id,
      reply_id
    });
  }
}
