export type GetRepliesFeedbackData = {
  likes: number;
  reply_id: string;
};

export type AddReplyFeedbackParams = {
  user_id: string;
  reply_id: string;
};

export type CanUserGiveFeedbackParams = {
  reply_id: string;
  user_id: string;
  feedback_type: 'positive' | 'negative';
}

export interface IReplyFeedbacksRepository {
  getRepliesFeedback: (reply_id: string[]) => Promise<GetRepliesFeedbackData[]>;
  createFirstReplyFeedback: (data: AddReplyFeedbackParams) => Promise<void>;
  addPositiveFeedback: (data: AddReplyFeedbackParams) => Promise<void>;
  addNegativeFeedback: (data: AddReplyFeedbackParams) => Promise<void>;
  canUserGiveReplyFeedback: (data: CanUserGiveFeedbackParams) => Promise<boolean>;
}
