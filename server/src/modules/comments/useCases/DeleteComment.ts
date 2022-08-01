import { ICommentsRepository } from '../repositories/ICommentsRepository';

export class DeleteComment {
  constructor(private commentsRepository: ICommentsRepository) {}

  async execute(id: string) {
    if (await this.commentsRepository.hasReplies(id)) {
      await this.commentsRepository.deleteCommentReplies(id);
    }

    await this.commentsRepository.delete(id);
  }
}
