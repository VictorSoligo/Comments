export type GetCommentsFeedbackData = {
  likes: number;
  comment_id: string;
};

export type AddCommentFeedbackParams = {
  comment_id: string;
  user_id: string;
};

export type CanUserGiveFeedbackParams = {
  comment_id: string;
  user_id: string;
  feedback_type: 'positive' | 'negative';
}

export interface ICommentFeedbacksRepository {
  getCommentsFeedback: (
    comment_id: string[]
  ) => Promise<GetCommentsFeedbackData[]>;
  createFirstCommentFeedback: (data: AddCommentFeedbackParams) => Promise<void>;
  addPositiveFeedback: (data: AddCommentFeedbackParams) => Promise<void>;
  addNegativeFeedback: (data: AddCommentFeedbackParams) => Promise<void>;
  canUserGiveCommentFeedback: (data: CanUserGiveFeedbackParams) => Promise<boolean>;
}
