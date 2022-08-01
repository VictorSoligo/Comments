import { useState } from 'react';

import { useRouter } from 'next/router';

import { TextArea } from './TextArea';

import { useAuth } from '../contexts/Auth';

import classnames from 'classnames';

import { api } from '../services/api';

export const AddCommentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');

  const { user } = useAuth();
  const router = useRouter();

  async function handleSubmitComment() {
    if (description === '') {
      return;
    }

    setIsSubmitting(true);

    api
      .post('/comments', {
        description,
        user_id: user?.id,
      })
      .then(() => {
        router.replace(router.asPath);
      })
      .finally(() => {
        setIsSubmitting(false);
        setDescription('');
      });
  }

  return (
    <div className="mt-4 flex w-11/12 md:w-[65%] bg-white p-6 rounded-lg">
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

      <div className="flex w-full mx-4">
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a comment"
          disabled={!user}
        />
      </div>

      <div className="">
        <button
          disabled={isSubmitting || !user}
          onClick={handleSubmitComment}
          className={classnames(
            'py-2 px-5 rounded-md uppercase text-white hover:opacity-80 text-sm font-semibold transition-colors disabled:cursor-not-allowed',
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
