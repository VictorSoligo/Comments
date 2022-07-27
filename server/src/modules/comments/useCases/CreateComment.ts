import { CommentsRepository } from '../repositories/prisma/CommentsRepository';
import { CreateCommentParams } from '../repositories/ICommentsRepository';

export class CreateComment {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({ description, user_id }: CreateCommentParams) {
    await this.commentsRepository.create({
      description,
      user_id,
    });
  }
}
