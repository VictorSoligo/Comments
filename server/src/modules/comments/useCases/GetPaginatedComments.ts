import { ICommentFeedbacksRepository } from '../repositories/ICommentFeedbacksRepository';
import { ICommentsRepository } from '../repositories/ICommentsRepository';
import { IReplyFeedbacksRepository } from '../repositories/IReplyFeedbacksRepository';

export class GetPaginatedComments {
  constructor(
    private commentsRepository: ICommentsRepository,
    private commentFeedbacksRepository: ICommentFeedbacksRepository,
    private replyFeedbacksRepository: IReplyFeedbacksRepository
  ) {}

  async execute(page: number) {
    const comments = await this.commentsRepository.getPaginated(page);

    let commentIds: string[] = [];
    let repliesIds: string[] = [];

    if (comments.length > 0) {
      comments.forEach((comment) => {
        if (comment.replies.length > 0) {
          comment.replies.forEach((reply) => repliesIds.push(reply.id));
        }

        commentIds.push(comment.id);
      });

      const likes = await this.commentFeedbacksRepository.getCommentsFeedback(
        commentIds
      );

      let repliesLikes = [];

      if (repliesIds.length > 0) {
        repliesLikes = await this.replyFeedbacksRepository.getRepliesFeedback(
          repliesIds
        );
      }

      if (likes.length > 0) {
        likes.forEach((like) => {
          comments.forEach((comment, commentIndex) => {
            if (comment.replies.length > 0) {
              comment.replies.forEach((reply, replyIndex) => {
                repliesLikes.forEach((replyLike) => {
                  const replyLikes =
                    reply.id === replyLike.reply_id
                      ? Number(replyLike.likes)
                      : 0;

                  comments[commentIndex].replies[replyIndex] = {
                    ...reply,
                    likes: replyLikes,
                  };
                });
              });
            }

            const commentLikes =
              comment.id === like.comment_id ? Number(like.likes) : 0;

            comments[commentIndex] = {
              ...comments[commentIndex],
              likes: commentLikes,
            };
          });
        });
      }
    }

    return comments;
  }
}
