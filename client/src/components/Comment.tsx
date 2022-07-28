import { Component, useState } from 'react';

import { FeedbackButton } from './FeedbackButton';
import { RepliesList } from './RepliesList';
import { ReplyButton } from './ReplyButton';
import { ReplyCommentForm } from './ReplyCommentForm';

import classNames from 'classnames';

export type ReplyData = Omit<CommentData, 'replies'> & {
  referenced_user: string;
  comment_id: string;
};

export type CommentData = {
  id: string;
  likes: number;
  description: string;
  created_at: string;
  referenced_user?: string;
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
  const [isReplying, setIsReplying] = useState(false);

  function toggleReplyForm() {
    setIsReplying((prevState) => !prevState);
  }

  const isReply = comment.replies?.length === undefined;

  return (
    <>
      <div
        className={classNames(
          'flex flex-row last:mb-0 w-full bg-white p-6 rounded-lg',
          {
            'mb-4': !isReply,
            'mt-4 first:mt-0': isReply,
          }
        )}
      >
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
              <ReplyButton onClick={toggleReplyForm} />
            </div>
          </div>

          <div className="text-gray-500">
            {comment.referenced_user && (
              <span className="text-indigo-700 font-bold">
                {`@${comment.referenced_user}`}
              </span>
            )}
            {' '}
            {comment.description}
          </div>

          <div className="flex md:hidden items-center justify-between mt-4">
            <FeedbackButton likes={comment.likes} />

            <ReplyButton onClick={toggleReplyForm} />
          </div>
        </div>
      </div>

      {isReplying && (
        <ReplyCommentForm
          isReply={isReply}
          setIsReplying={setIsReplying}
          comment={comment}
        />
      )}

      {comment.replies?.length! > 0 ? (
        <RepliesList replies={comment.replies!} />
      ) : null}
    </>
  );
};
