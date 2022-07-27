import { CommentsRepository } from '../repositories/prisma/CommentsRepository';

export class GetLast3Comments {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute() {
    const comments = await this.commentsRepository.getLast3();

    return comments;
  }
}
