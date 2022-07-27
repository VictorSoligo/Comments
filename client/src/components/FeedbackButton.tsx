import { useState } from 'react';

type FeedbackButtonProps = {
  likes: number
}

export const FeedbackButton = ({ likes }: FeedbackButtonProps) => {
  const [likesCount, setLikesCount] = useState(likes);

  function handleIncrement() {
    setLikesCount((prevState) => prevState + 1);
  }

  function handleDecrement() {
    setLikesCount((prevState) => prevState - 1);
  }
  return (
    <div className="flex flex-row md:flex-col mr-6 items-center bg-indigo-50 rounded-lg">
      <button className="flex items-center p-4" onClick={handleIncrement}>
        <img className="md:w-5" src="/icons/icon-plus.svg" alt="Add like" />
      </button>

      <span className="text-lg text-indigo-700 font-bold">{likesCount}</span>

      <button className="flex items-center p-4" onClick={handleDecrement}>
        <img className="md:w-5" src="/icons/icon-minus.svg" alt="Add dislike" />
      </button>
    </div>
  );
};
