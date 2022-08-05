import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { CommentData } from '../components/Comment';

import { api } from '../services/api';

type CommentsContextData = {
  comments: CommentData[];
  setComments: Dispatch<SetStateAction<CommentData[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isFetchBlocked: boolean;
  setIsFetchBlocked: Dispatch<SetStateAction<boolean>>;
  fetchComments: () => void;
};

type CommentsContextProviderProps = {
  children: ReactNode;
};

export const CommentsContext = createContext({} as CommentsContextData);

export const CommentsContextProvider = ({
  children,
}: CommentsContextProviderProps) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [page, setPage] = useState(0);
  const [isFetchBlocked, setIsFetchBlocked] = useState(false);

  function fetchComments() {
    let limit = page === 0 ? 3 : page * 6;

    api.get(`/comments?limit=${limit}`).then((response) => {
      const comments = response.data.comments;

      setComments(comments);
    });
  }

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        page,
        setPage,
        fetchComments,
        isFetchBlocked,
        setIsFetchBlocked,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentsContext);

  return context;
};
