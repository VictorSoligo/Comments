import { useState } from 'react';

import { CommentData } from './Comment';

import { api } from '../services/api';
import { useComments } from '../contexts/Comments';

export const LoadMoreComments = () => {
  const [isFetching, setIsFetching] = useState(false);

  const {
    setComments,
    page,
    setPage,
    isFetchBlocked,
    setIsFetchBlocked
  } = useComments();

  function loadMoreComments() {
    setIsFetching(true);

    let teste = page === 0 ? 1 : page + 1;

    api
      .get(`/comments/paginated?page=${teste}`)
      .then((response) => {
        const comments: CommentData[] = response.data.comments;

        if (comments.length > 0) {
          setPage((prev) => prev + 1);

          setComments((prevComments) => [
            ...prevComments,
            ...response.data.comments,
          ]);
        }

        if (page > 1 && (comments.length === 0 || comments.length < 6)) {
          setIsFetchBlocked(true);
        }
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  return (
    <>
      {!isFetchBlocked && (
        <div className="flex justify-center w-full">
          {isFetching ? (
            <span>Carregando...</span>
          ) : (
            <span
              className="text-indigo-700 cursor-pointer hover:underline"
              onClick={loadMoreComments}
            >
              Load more comments
            </span>
          )}
        </div>
      )}
    </>
  );
};
