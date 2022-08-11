import { CommentWithUserInfo } from '../dtos/CommentWithUserInfo';
import { ICommentFeedbacksRepository } from '../repositories/ICommentFeedbacksRepository';
import { ICommentsRepository } from '../repositories/ICommentsRepository';
import {
  GetRepliesFeedbackData,
  IReplyFeedbacksRepository,
} from '../repositories/IReplyFeedbacksRepository';

export class GetComments {
  constructor(
    private commentsRepository: ICommentsRepository,
    private commentFeedbacksRepository: ICommentFeedbacksRepository,
    private replyFeedbacksRepository: IReplyFeedbacksRepository
  ) {}

  async execute(limit: number) {
    let comments: CommentWithUserInfo[] = await this.commentsRepository.get(
      limit
    );

    if (comments.length > 0) {
      let commentIds: string[] = [];
      let repliesIds: string[] = [];

      comments.forEach((comment) => {
        if (comment.replies.length > 0) {
          comment.replies.forEach((reply) => repliesIds.push(reply.id));
        }

        commentIds.push(comment.id);
      });

      const commentsLikes = await this.commentFeedbacksRepository.getCommentsFeedback(
        commentIds
      );

      let repliesLikes: GetRepliesFeedbackData[] = [];

      if (repliesIds.length > 0) {
        repliesLikes = await this.replyFeedbacksRepository.getRepliesFeedback(
          repliesIds
        );
      }

      comments.forEach((comment, commentIndex) => {
        let likes = 0;

        const commentLikes = commentsLikes.filter((commentLike) => {
          return commentLike.comment_id === comment.id;
        });

        if (commentLikes.length > 0) {
          likes = Number(commentLikes[0].likes);
        }

        comments[commentIndex] = {
          ...comments[commentIndex],
          likes,
        };

        if (comment.replies.length > 0) {
          comment.replies.forEach((reply, replyIndex) => {
            const replyLikes = repliesLikes.filter((replyLike) => {
              return replyLike.reply_id === reply.id;
            });

            let likes = 0;

            if (replyLikes.length > 0) {
              likes = Number(replyLikes[0].likes);
            }

            comments[commentIndex].replies[replyIndex] = {
              ...reply,
              likes,
            };
          });
        }
      });
    }

    return comments;
  }
}
