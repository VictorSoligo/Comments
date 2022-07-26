type Reply = Omit<CommentWithUserInfo, "replies"> & {
  comment_id: string;
  referenced_user: string;
}

export type CommentWithUserInfo = {
  id: string;
  description: string;
  created_at: Date;
  likes?: number;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
  replies: Reply[];
}
