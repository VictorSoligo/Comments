type Reply = {
  id: string;
  likes: number;
  description: string;
  created_at: Date;
  user: {
    id: string;
    avatar_url: string;
    name: string;
  };
}

export type CommentWithUserInfo = {
  id: string;
  likes: number;
  description: string;
  created_at: Date;
  user: {
    id: string;
    avatar_url: string;
    name: string;
  };
  replies: Reply[];
}
