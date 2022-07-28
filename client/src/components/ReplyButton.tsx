import Image from 'next/image';

type ReplyButtonProps = {
  onClick: () => void;
};

export const ReplyButton = ({ onClick }: ReplyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center p-2 hover:bg-indigo-100 transition-colors rounded-md"
    >
      <Image src="/icons/icon-reply.svg" height={16} width={16} />

      <span className="text-indigo-700 font-semibold ml-2">
        Reply
      </span>
    </button>
  );
};
