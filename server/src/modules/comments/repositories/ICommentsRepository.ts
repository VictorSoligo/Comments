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
  create: (data: CreateCommentParams) => Promise<string>;
  delete: (id: string) => Promise<void>;
  hasReplies: (id: string) => Promise<boolean>;
  updateCommentDescription: (data: UpdateCommentDescriptionParams) => Promise<void>;
}
