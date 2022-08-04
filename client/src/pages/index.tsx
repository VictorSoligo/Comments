import { useEffect } from 'react';

import type { GetServerSideProps, NextPage } from 'next';

import { CommentsContainer } from '../components/CommentsContainer';
import { AddCommentForm } from '../components/AddCommentForm';
import { Header } from '../components/Header';
import { LoginCard } from '../components/LoginCard';
import { CommentData } from '../components/Comment';

import { useAuth } from '../contexts/Auth';

import { api } from '../services/api';
import { useComments } from '../contexts/Comments';

type HomeProps = {
  comments: CommentData[];
};

const Home: NextPage<HomeProps> = ({ comments }) => {
  const { user } = useAuth();
  const { setComments } = useComments();

  useEffect(() => {
    setComments(comments);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 items-center py-5 md:py-10">
      {!user ? <LoginCard /> : <Header />}

      <CommentsContainer />

      <div className="flex-1"></div>

      <AddCommentForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/comments?limit=3');

  return {
    props: {
      comments: data.comments,
    },
  };
};

export default Home;
