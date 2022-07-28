import { CreateReplyParams } from '../repositories/IRepliesRepository';
import { RepliesRepository } from '../repositories/prisma/RepliesRepository';

export class CreateReply {
  constructor(private repliesRepository: RepliesRepository) {}

  async execute({
    comment_id,
    description,
    referenced_user,
    user_id,
  }: CreateReplyParams) {
    await this.repliesRepository.create({
      comment_id,
      description,
      referenced_user,
      user_id,
    });
  }
}
