import { Comment, CommentData } from './Comment';

type CommentListProps = {
  comments: CommentData[];
};

export const CommentsList = ({ comments }: CommentListProps) => {
  return (
    <div className="flex flex-col w-11/12 md:w-[65%] overflow-y-auto">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
};
