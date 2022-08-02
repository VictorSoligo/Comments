import { IRepliesRepository, UpdateReplyDescriptionParams } from '../repositories/IRepliesRepository';

export class UpdateReplyDescription {
  constructor(private repliesRepository: IRepliesRepository) {}

  async execute({ description, reply_id }: UpdateReplyDescriptionParams) {
    await this.repliesRepository.updateReplyDescription({
      description,
      reply_id,
    });
  }
}
