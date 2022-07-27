import { Comment } from './Comment';

export const CommentsList = () => {
  return (
    <div className="w-11/12 md:w-3/5 overflow-auto">
      <Comment />
      <Comment />
    </div>
  );
}
