export type CreateReplyParams = {
  description: string;
  referenced_user: string;
  user_id: string;
  comment_id: string;
}

export interface IRepliesRepository {
  create: (data: CreateReplyParams) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
