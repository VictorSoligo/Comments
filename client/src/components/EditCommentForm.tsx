import { Dispatch, SetStateAction, useState } from 'react';

import { useRouter } from 'next/router';

import { CommentData } from './Comment';
import { TextArea } from './TextArea';

import { api } from '../services/api';
import classnames from 'classnames';

type EditCommentFormProps = {
  comment: CommentData;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isReply: boolean;
};

export const EditCommentForm = ({
  comment,
  setIsEditing,
  isReply,
}: EditCommentFormProps) => {
  const [description, setDescription] = useState(comment.description);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  async function handleEditComment() {
    if (description === comment.description || description === '') {
      return;
    }

    setIsSubmitting(true);

    const url = isReply ? '/replies' : '/comments';

    const data = isReply
      ? {
          description,
          reply_id: comment.id,
        }
      : {
          description,
          comment_id: comment.id,
        };

    api
      .put(url, data)
      .then(() => {
        router.replace(router.asPath);
      })
      .finally(() => {
        setIsEditing(false);
      });
  }

  return (
    <div className="flex flex-col items-end">
      <TextArea
        placeholder="Edit the comment"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleEditComment}
        className={classnames(
          'mt-4 py-2 px-5 rounded-md uppercase text-white hover:opacity-80 text-sm font-semibold transition-colors disabled:cursor-not-allowed',
          {
            'bg-indigo-700': !isSubmitting,
            'bg-indigo-300': isSubmitting,
          }
        )}
      >
        Save
      </button>
    </div>
  );
};
