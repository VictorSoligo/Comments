import { CommentsRepository } from '../repositories/prisma/CommentsRepository';
import { CreateCommentParams } from '../repositories/ICommentsRepository';
import { ICommentFeedbacksRepository } from '../repositories/ICommentFeedbacksRepository';

export class CreateComment {
  constructor(
    private commentsRepository: CommentsRepository,
    private commentFeedbacksRepository: ICommentFeedbacksRepository
  ) {}

  async execute({ description, user_id }: CreateCommentParams) {
    const comment_id = await this.commentsRepository.create({
      description,
      user_id,
    });

    await this.commentFeedbacksRepository.createFirstCommentFeedback({
      comment_id,
      user_id,
    });
  }
}
