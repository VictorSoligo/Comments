import { Dispatch, SetStateAction, useState } from 'react';

import { useAuth } from '../contexts/Auth';
import { useComments } from '../contexts/Comments';

import { TextArea } from './TextArea';
import { CommentData } from './Comment';

import classnames from 'classnames';
import { toast } from 'react-toastify';

import { api } from '../services/api';

type Comment = CommentData & {
  referenced_user?: string;
  comment_id?: string;
};

type ReplyCommentFromProps = {
  isReply: boolean;
  setIsReplying: Dispatch<SetStateAction<boolean>>;
  comment: Comment;
};

export const ReplyCommentForm = ({
  isReply,
  setIsReplying,
  comment,
}: ReplyCommentFromProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');

  const { user } = useAuth();
  const { fetchComments } = useComments();

  const notify = () => toast.success('Replied!');

  async function handleSubmitReply() {
    if (description == '') {
      return;
    }

    setIsSubmitting(true);

    // if you're replying an reply, pass the relationated comment_id instead
    const comment_id = isReply ? comment.comment_id : comment.id;

    api
      .post('/replies', {
        description,
        comment_id,
        referenced_user: comment.user.login,
        user_id: user?.id,
      })
      .then(() => {
        setIsReplying(false);
        fetchComments();
        notify();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div
      className={classnames('flex w-full bg-white p-6 rounded-lg', {
        'mb-4 last:mb-0': !isReply,
        'mt-4': isReply,
      })}
    >
      <div>
        <img
          className={classnames('rounded-full mr-4', {
            'border border-indigo-700 bg-indigo-50': !user,
          })}
          src={user?.avatar_url}
          height={40}
          width={40}
        />
      </div>

      <div className="w-full mx-4">
        <TextArea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a reply"
        />
      </div>

      <div>
        <button
          disabled={isSubmitting}
          onClick={handleSubmitReply}
          className={classnames(
            'py-2 px-5 rounded-md uppercase text-white hover:opacity-80 text-sm font-semibold transition-colors',
            {
              'bg-indigo-700': !isSubmitting,
              'bg-indigo-300': isSubmitting,
            }
          )}
        >
          Reply
        </button>
      </div>
    </div>
  );
};
