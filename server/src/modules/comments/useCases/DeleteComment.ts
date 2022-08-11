import { ICommentsRepository } from '../repositories/ICommentsRepository';

export class DeleteComment {
  constructor(private commentsRepository: ICommentsRepository) {}

  async execute(id: string) {
    const hasReplies = await this.commentsRepository.hasReplies(id)

    if (hasReplies) {
      await this.commentsRepository.deleteCommentReplies(id);
    }

    await this.commentsRepository.delete(id);
  }
}
