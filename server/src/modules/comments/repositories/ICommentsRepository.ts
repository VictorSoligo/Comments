import { CommentWithUserInfo } from '../dtos/CommentWithUserInfo';

export type CreateCommentParams = {
  description: string;
  user_id: string;
};

export type UpdateCommentDescriptionParams = {
  description: string;
  comment_id: string;
};

export interface ICommentsRepository {
  get: (take: number) => Promise<CommentWithUserInfo[]>;
  getPaginated: (page: number) => Promise<CommentWithUserInfo[]>;
  create: (data: CreateCommentParams) => Promise<void>;
  delete: (id: string) => Promise<void>;
  hasReplies: (id: string) => Promise<boolean>;
  deleteCommentReplies: (id: string) => Promise<void>;
  updateCommentDescription: (
    data: UpdateCommentDescriptionParams
  ) => Promise<void>;
}
