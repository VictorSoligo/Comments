export type GetRepliesFeedbackData = {
  likes: number;
  reply_id: string;
};

export type AddReplyFeedbackParams = {
  reply_id: string;
  user_id: string;
};

export interface IReplyFeedbacksRepository {
  getRepliesFeedback: (reply_id: string[]) => Promise<GetRepliesFeedbackData[]>;
  createFirstReplyFeedback: (data: AddReplyFeedbackParams) => Promise<void>;
  addPositiveFeedback: (data: AddReplyFeedbackParams) => Promise<void>;
  addNegativeFeedback: (data: AddReplyFeedbackParams) => Promise<void>;
}
