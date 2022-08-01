import { useAuth } from '../contexts/Auth';
import { useRouter } from 'next/router';

import { Button } from './Button';

import DeleteIcon from '../../public/icons/icon-delete.svg';
import ReplyIcon from '../../public/icons/icon-reply.svg';
import EditIcon from '../../public/icons/icon-edit.svg';

import { api } from '../services/api';

import { CommentData } from './Comment';

type CommentActions = {
  comment: CommentData;
  toggleReplyForm: () => void;
  isReply: boolean;
};

export const CommentActions = ({
  comment,
  isReply,
  toggleReplyForm,
}: CommentActions) => {
  const { user } = useAuth();
  const router = useRouter();

  function handleDeleteComment() {
    api
      .delete('/comments', {
        data: {
          comment_id: comment.id,
        },
      })
      .then(() => {
        router.replace(router.asPath);
      });
  }

  function handleDeleteReply() {
    api
      .delete('/replies', {
        data: {
          reply_id: comment.id,
        },
      })
      .then(() => {
        router.replace(router.asPath);
      });
  }

  const deleteFunction = isReply ? handleDeleteReply : handleDeleteComment;

  return (
    <>
      {comment.user.id === user?.id ? (
        <div className="flex items-center justify-center gap-2">
          <Button
            icon={DeleteIcon}
            text="Delete"
            variant="delete"
            onClick={deleteFunction}
          />

          <Button icon={EditIcon} text="Edit" onClick={toggleReplyForm} />
        </div>
      ) : (
        <Button icon={ReplyIcon} text="Reply" onClick={toggleReplyForm} />
      )}
    </>
  );
};
