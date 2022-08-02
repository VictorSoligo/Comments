import {
  ICommentsRepository,
  UpdateCommentDescriptionParams,
} from '../repositories/ICommentsRepository';

export class UpdateCommentDescription {
  constructor(private commentsRepository: ICommentsRepository) {}

  async execute({ comment_id, description }: UpdateCommentDescriptionParams) {
    await this.commentsRepository.updateCommentDescription({
      comment_id,
      description,
    });
  }
}
