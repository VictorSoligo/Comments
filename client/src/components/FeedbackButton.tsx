import { useState } from 'react';

export const FeedbackButton = () => {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount((prevState) => prevState + 1);
  }

  function handleDecrement() {
    setCount((prevState) => prevState - 1);
  }
  return (
    <div className="flex flex-row md:flex-col mr-6 items-center bg-indigo-50 rounded-lg">
      <button className="flex items-center p-4" onClick={handleIncrement}>
        <img className="md:w-5" src="/icons/icon-plus.svg" alt="Add like" />
      </button>

      <span className="text-lg text-indigo-700 font-bold">{count}</span>

      <button className="flex items-center p-4" onClick={handleDecrement}>
        <img className="md:w-5" src="/icons/icon-minus.svg" alt="Add dislike" />
      </button>
    </div>
  );
};
