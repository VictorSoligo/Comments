import { Comment } from '@prisma/client';

export type CreateCommentParams = {
  description: string;
  user_id: string;
}

export interface ICommentsRepository {
  create: (data: CreateCommentParams) => Promise<void>;
}
