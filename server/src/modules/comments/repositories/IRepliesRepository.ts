export type CreateReplyParams = {
  description: string;
  referenced_user: string;
  user_id: string;
  comment_id: string;
};

export type UpdateReplyDescriptionParams = {
  description: string;
  reply_id: string;
};

export interface IRepliesRepository {
  create: (data: CreateReplyParams) => Promise<string>;
  delete: (id: string) => Promise<void>;
  deleteCommentReplies: (comment_id: string) => Promise<void>;
  updateReplyDescription: (data: UpdateReplyDescriptionParams) => Promise<void>;
}
