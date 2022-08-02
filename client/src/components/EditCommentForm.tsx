import { useState } from 'react';

import { CommentData } from './Comment';
import { TextArea } from './TextArea';

import classnames from 'classnames';

type EditCommentFormProps = {
  comment: CommentData;
}

export const EditCommentForm = ({ comment }: EditCommentFormProps) => {
  const [description, setDescription] = useState(comment.description);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEditComment() {

  }

  return (
    <div className="flex flex-col items-end">
      <TextArea
        placeholder="Edit the comment"
        value={description}
        onChange={e => setDescription(e.target.value)}
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
}
