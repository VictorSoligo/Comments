import { useState } from 'react';

import { useRouter } from 'next/router';

import classnames from 'classnames';

import { api } from '../services/api';

export const AddCommentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');

  const router = useRouter();

  async function handleSubmitComment() {
    if (description === '') {
      return;
    }

    setIsSubmitting(true);

    api
      .post('/comments', {
        description,
        user_id: 'f095b1a6-3682-42a2-ab60-3e3c578e9b7e',
      })
      .then(() => {
        setDescription('');
        router.replace(router.asPath);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="mt-4 flex w-11/12 md:w-3/5 bg-white p-6 rounded-lg">
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
          placeholder="Add a comment"
          className="p-2 w-full text-md placeholder-gray-500 text-gray-500 border border-gray-200 bg-transparent rounded-lg resize-none focus:border-indigo-700 outline-none"
        ></textarea>
      </div>

      <div>
        <button
          disabled={isSubmitting}
          onClick={handleSubmitComment}
          className={classnames(
            'py-2 px-5 rounded-md uppercase text-white hover:bg-indigo-500 text-sm font-semibold transition-colors',
            {
              'bg-indigo-700': !isSubmitting,
              'bg-indigo-300': isSubmitting,
            }
          )}
        >
          Send
        </button>
      </div>
    </div>
  );
};
