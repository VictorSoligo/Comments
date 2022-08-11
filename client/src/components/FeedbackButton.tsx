import { useState } from 'react';

import { useAuth } from '../contexts/Auth';

import { toast } from 'react-toastify';

import { api } from '../services/api';

type FeedbackButtonProps = {
  likes: number;
  isReply: boolean;
  comment_id: string;
};

export const FeedbackButton = ({
  likes,
  isReply,
  comment_id,
}: FeedbackButtonProps) => {
  const [likesCount, setLikesCount] = useState(likes);
  const [isPlusButtonDisabled, setIsPlusButtonDisabled] = useState(false);
  const [isMinusButtonDisabled, setIsMinusButtonDisabled] = useState(false);

  const { user } = useAuth();

  const notify = (message: string) => toast.error(message);

  function handlePositiveFeedback() {
    let data: any = {
      isReply,
      feedback_type: 'positive',
      comment_id,
    };

    if (isReply) {
      data = {
        isReply,
        feedback_type: 'positive',
        reply_id: comment_id,
      };
    }

    api
      .post('/feedbacks', data)
      .then(() => {
        setLikesCount((prevState) => prevState + 1);

        if (isMinusButtonDisabled) {
          setIsMinusButtonDisabled(false);
        }
      })
      .catch((error) => {
        setIsPlusButtonDisabled(true);
        notify(error.response.data.message);
      });
  }

  function handleNegativeFeedback() {
    let data: any = {
      isReply,
      feedback_type: 'negative',
      comment_id,
    };

    if (isReply) {
      data = {
        isReply,
        feedback_type: 'negative',
        reply_id: comment_id,
      };
    }

    api
      .post('/feedbacks', data)
      .then(() => {
        setLikesCount((prevState) => prevState - 1);

        if (isPlusButtonDisabled) {
          setIsPlusButtonDisabled(false);
        }
      })
      .catch((error) => {
        setIsMinusButtonDisabled(true);
        notify(error.response.data.message);
      });
  }

  return (
    <div className="flex min-w-max flex-row md:flex-col mr-6 items-center bg-gray-100 rounded-lg">
      <button
        disabled={!user || isPlusButtonDisabled}
        onClick={handlePositiveFeedback}
        className="flex items-center p-4 disabled:cursor-not-allowed"
      >
        <img className="md:w-3" src="/icons/icon-plus.svg" alt="Add like" />
      </button>

      <span className="text-lg text-indigo-700 font-bold">{likesCount}</span>

      <button
        onClick={handleNegativeFeedback}
        disabled={!user || isMinusButtonDisabled}
        className="flex items-center p-4 disabled:cursor-not-allowed"
      >
        <img className="md:w-3" src="/icons/icon-minus.svg" alt="Add dislike" />
      </button>
    </div>
  );
};
