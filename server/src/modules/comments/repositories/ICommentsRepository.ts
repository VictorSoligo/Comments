import { CommentWithUserInfo } from '../dtos/CommentWithUserInfo';

export type CreateCommentParams = {
  description: string;
  user_id: string;
}

export interface ICommentsRepository {
  create: (data: CreateCommentParams) => Promise<void>;
  getLast3: () => Promise<CommentWithUserInfo[]>
}
