import { useState } from 'react';

import { FeedbackButton } from './FeedbackButton';
import { RepliesList } from './RepliesList';
import { ReplyCommentForm } from './ReplyCommentForm';
import { CommentActions } from './CommentActions';
import { EditCommentForm } from './EditCommentForm';

import { User } from '../contexts/Auth';

import { formatDistance } from 'date-fns';

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
  user: User;
  replies?: ReplyData[];
};

type CommentProps = {
  comment: CommentData;
};

export const Comment = ({ comment }: CommentProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function toggleReplyForm() {
    setIsReplying((prevState) => !prevState);
  }

  function toggleEditComment() {
    setIsEditing((prevState) => !prevState);
  }

  const isReply = comment.replies === undefined;

  const formattedDate = formatDistance(
    new Date(comment.created_at),
    new Date(),
    {
      addSuffix: true,
    }
  );

  return (
    <>
      <div
        className={classNames('flex last:mb-0 w-full bg-white p-6 rounded-lg', {
          'mb-4': !isReply,
          'mt-4 first:mt-0': isReply,
        })}
      >
        <div className="hidden md:flex h-min">
          <FeedbackButton likes={comment.likes} />
        </div>

        <div className="flex flex-col flex-1 break-all">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img
                className="rounded-full mr-2"
                src={comment.user.avatar_url}
                height={30}
                width={30}
              />

              <span className="text-gray-800 font-semibold mr-4">
                {comment.user.login}
              </span>

              <span className="text-gray-500">{formattedDate}</span>
            </div>

            <div className="hidden md:flex">
              <CommentActions
                comment={comment}
                isReply={isReply}
                toggleReplyForm={toggleReplyForm}
                toggleEditComment={toggleEditComment}
              />
            </div>
          </div>

          <div className="text-gray-500">
            {isEditing ? (
              <EditCommentForm
                isReply={isReply}
                setIsEditing={setIsEditing}
                comment={comment}
              />
            ) : (
              <span>
                {comment.referenced_user && (
                  <span className="text-indigo-700 font-bold">
                    {`@${comment.referenced_user}`}
                  </span>
                )}{' '}
                {comment.description}
              </span>
            )}
          </div>

          <div className="flex md:hidden items-center justify-between mt-4">
            <FeedbackButton likes={comment.likes} />

            <CommentActions
              comment={comment}
              isReply={isReply}
              toggleReplyForm={toggleReplyForm}
              toggleEditComment={toggleEditComment}
            />
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
