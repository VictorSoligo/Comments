import Image from 'next/image';

import { useAuth } from '../contexts/Auth';

type ReplyButtonProps = {
  onClick: () => void;
};

export const ReplyButton = ({ onClick }: ReplyButtonProps) => {
  const { user } = useAuth();

  return (
    <button
      onClick={onClick}
      disabled={!user}
      className="flex items-center p-2 hover:bg-indigo-100 transition-colors rounded-md disabled:cursor-not-allowed"
    >
      <Image src="/icons/icon-reply.svg" height={16} width={16} />

      <span className="text-indigo-700 font-semibold ml-2">
        Reply
      </span>
    </button>
  );
};
