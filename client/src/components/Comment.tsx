import { FeedbackButton } from './FeedbackButton';
import { RepliesList } from './RepliesList';
import { ReplyButton } from './ReplyButton';

export type ReplyData = {
  id: string;
  likes: number;
  description: string;
  created_at: string;
  referenced_user: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
  };
}

export type CommentData = {
  id: string;
  likes: number;
  description: string;
  created_at: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
  };
  replies?: ReplyData[];
};

type CommentProps = {
  comment: CommentData;
};

export const Comment = ({ comment }: CommentProps) => {
  return (
    <>
      <div className="flex flex-row mb-4 last:mb-0 w-full bg-white p-6 rounded-lg">
        <div className="hidden md:block">
          <FeedbackButton likes={comment.likes} />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img
                className="rounded-full mr-4"
                src={comment.user.avatar_url}
                height={30}
                width={30}
              />

              <span className="text-gray-800 font-semibold mr-4">
                {comment.user.name}
              </span>

              <span className="text-gray-500">{comment.created_at}</span>
            </div>

            <div className="hidden md:flex">
              <ReplyButton />
            </div>
          </div>

          <div className="text-gray-500">{comment.description}</div>

          <div className="flex md:hidden items-center justify-between mt-4">
            <FeedbackButton likes={comment.likes} />

            <ReplyButton />
          </div>
        </div>
      </div>

      {comment.replies?.length! > 0 ? <RepliesList replies={comment.replies!} /> : null}
    </>
  );
};
