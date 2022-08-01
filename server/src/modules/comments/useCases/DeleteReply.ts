import { IRepliesRepository } from '../repositories/IRepliesRepository';

export class DeleteReply {
  constructor(private repliesRepository: IRepliesRepository) {}

  async execute(id: string) {
    await this.repliesRepository.delete(id);
  }
}
