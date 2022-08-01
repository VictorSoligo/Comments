import { useState } from 'react';
import { useAuth } from '../contexts/Auth';

type FeedbackButtonProps = {
  likes: number;
};

export const FeedbackButton = ({ likes }: FeedbackButtonProps) => {
  const [likesCount, setLikesCount] = useState(likes);

  const { user } = useAuth();

  function handleIncrement() {
    setLikesCount((prevState) => prevState + 1);
  }

  function handleDecrement() {
    setLikesCount((prevState) => prevState - 1);
  }

  return (
    <div className="flex min-w-max flex-row md:flex-col mr-6 items-center bg-gray-100 rounded-lg">
      <button
        disabled={!user}
        onClick={handleIncrement}
        className="flex items-center p-4 disabled:cursor-not-allowed"
      >
        <img className="md:w-3" src="/icons/icon-plus.svg" alt="Add like" />
      </button>

      <span className="text-lg text-indigo-700 font-bold">{likesCount}</span>

      <button
        onClick={handleDecrement}
        disabled={!user}
        className="flex items-center p-4 disabled:cursor-not-allowed"
      >
        <img className="md:w-3" src="/icons/icon-minus.svg" alt="Add dislike" />
      </button>
    </div>
  );
};
