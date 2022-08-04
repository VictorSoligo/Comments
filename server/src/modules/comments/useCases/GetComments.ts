import { ICommentsRepository } from '../repositories/ICommentsRepository';

export class GetComments {
  constructor(private commentsRepository: ICommentsRepository) {}

  async execute(limit: number) {
    const comments = await this.commentsRepository.get(limit);

    return comments;
  }
}
