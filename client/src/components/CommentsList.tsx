import { Comment, CommentData } from './Comment';

type CommentListProps = {
  comments: CommentData[];
};

export const CommentsList = ({ comments }: CommentListProps) => {
  return (
    <div className="w-11/12 md:w-[65%] overflow-auto">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
};
