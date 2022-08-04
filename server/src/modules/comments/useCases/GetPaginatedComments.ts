import { ICommentsRepository } from '../repositories/ICommentsRepository';

export class GetPaginatedComments {
  constructor(private commentsRepository: ICommentsRepository) {}

  async execute(page: number) {
    const comments = await this.commentsRepository.getPaginated(page);

    return comments;
  }
}
