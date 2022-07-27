import { Comment, ReplyData } from './Comment';

type RepliesListProps = {
  replies: ReplyData[];
};

export const RepliesList = ({ replies }: RepliesListProps) => {
  return (
    <div className="flex w-full mb-4 last:mb-0">
      <div className="h-auto w-[2px] bg-gray-200 mx-10"></div>

      {replies.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </div>
  );
};
