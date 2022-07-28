import { Dispatch, SetStateAction, useState } from 'react';

import { useAuth } from '../contexts/Auth';

import classnames from 'classnames';

import { useRouter } from 'next/router';

import { api } from '../services/api';

import { CommentData } from './Comment';

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

  const router = useRouter();
  const { user } = useAuth();

  async function handleSubmitReply() {
    if (description == '') {
      return;
    }

    setIsSubmitting(true);

    const comment_id = isReply ? comment.comment_id : comment.id;

    api.post('/replies', {
      description,
      comment_id,
      referenced_user: comment.user.name,
      user_id: 'f095b1a6-3682-42a2-ab60-3e3c578e9b7e',
    }).then(() => {
      setIsReplying(false);
      router.replace(router.asPath);
    }).finally(() => {
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
          className="rounded-full mr-4"
          src="https://avatars.githubusercontent.com/u/54515535?v=4"
          height={40}
          width={40}
        />
      </div>

      <div className="w-full mx-4">
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a reply"
          className="p-2 w-full text-md placeholder-gray-500 text-gray-500 border border-gray-200 bg-transparent rounded-lg resize-none focus:border-indigo-700 outline-none"
        ></textarea>
      </div>

      <div>
        <button
          disabled={isSubmitting}
          onClick={handleSubmitReply}
          className={classnames(
            'py-2 px-5 rounded-md uppercase text-white hover:bg-indigo-500 text-sm font-semibold transition-colors',
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
