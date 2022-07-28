import type { GetServerSideProps, NextPage } from 'next';

import { CommentsList } from '../components/CommentsList';
import { AddCommentForm } from '../components/AddCommentForm';
import { CommentData } from '../components/Comment';

import { useAuth } from '../contexts/Auth';

import { LoginCard } from '../components/LoginCard';

import { api } from '../services/api';

type HomeProps = {
  comments: CommentData[];
};

const Home: NextPage<HomeProps> = ({ comments }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-gray-100 items-center py-10">
      {!user && <LoginCard />}

      <CommentsList comments={comments} />

      <div className="flex-1"></div>

      <AddCommentForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/comments');

  return {
    props: {
      comments: data.comments,
    },
  };
};

export default Home;
