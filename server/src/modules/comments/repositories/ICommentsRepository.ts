import { CommentWithUserInfo } from '../dtos/CommentWithUserInfo';

export type CreateCommentParams = {
  description: string;
  user_id: string;
}

export interface ICommentsRepository {
  getLast3: () => Promise<CommentWithUserInfo[]>;
  create: (data: CreateCommentParams) => Promise<void>;
  delete: (id: string) => Promise<void>;
  hasReplies: (id: string) => Promise<boolean>;
  deleteCommentReplies: (id: string) => Promise<void>;
}
