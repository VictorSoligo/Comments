import { Comment } from './Comment';
import { LoadMoreComments } from './LoadMoreComments';

import { useComments } from '../contexts/Comments';
import { Spinner } from './Spinner';

export const CommentsContainer = () => {
  const { comments, isFetchingComments } = useComments();

  return (
    <>
      {isFetchingComments ? (
        <Spinner />
      ) : (
        <div className="flex flex-col w-11/12 md:w-[65%] overflow-y-auto">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}

          {comments.length >= 3 && <LoadMoreComments />}
        </div>
      )}
    </>
  );
};
