import { CommentsRepository } from '../repositories/prisma/CommentsRepository';

type CreateCommentRequet = {
  description: string;
  user_id: string;
};

export class CreateComment {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({ description, user_id }: CreateCommentRequet) {
    await this.commentsRepository.create({
      description,
      user_id,
    });
  }
}
