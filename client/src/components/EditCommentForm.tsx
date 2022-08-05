import { Dispatch, SetStateAction, useState } from 'react';

import { CommentData } from './Comment';
import { TextArea } from './TextArea';

import { useComments } from '../contexts/Comments';

import classnames from 'classnames';
import { toast } from 'react-toastify';

import { api } from '../services/api';

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

  const { fetchComments } = useComments();

  const notify = (message: string) => toast.success(message);

  async function handleEditComment() {
    if (description === comment.description || description === '') {
      return;
    }

    setIsSubmitting(true);

    let url = '/comments';
    let message = 'Edited comment!';
    let data: any = {
      description,
      comment_id: comment.id,
    };

    if (isReply) {
      url = '/replies';
      message = 'Edited reply!';
      data = {
        description,
        reply_id: comment.id,
      };
    }

    api
      .put(url, data)
      .then(() => {
        fetchComments();
        notify(message);
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
