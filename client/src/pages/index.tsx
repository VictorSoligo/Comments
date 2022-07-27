import type { NextPage } from 'next';

import { CommentsList } from '../components/CommentsList';
import { AddCommentForm } from '../components/AddCommentForm';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 items-center py-10">
      <CommentsList />

      <div className="flex-1"></div>

      <AddCommentForm />
    </div>
  );
};

export default Home;
