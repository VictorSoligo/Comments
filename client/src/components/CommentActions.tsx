import { useAuth } from '../contexts/Auth';

import { Button } from './Button';

import DeleteIcon from '../../public/icons/icon-delete.svg';
import ReplyIcon from '../../public/icons/icon-reply.svg';
import EditIcon from '../../public/icons/icon-edit.svg';

import { toast } from 'react-toastify';
import { api } from '../services/api';

import { CommentData } from './Comment';
import { useComments } from '../contexts/Comments';

type CommentActions = {
  comment: CommentData;
  isReply: boolean;
  toggleReplyForm: () => void;
  toggleEditComment: () => void;
};

export const CommentActions = ({
  comment,
  isReply,
  toggleReplyForm,
  toggleEditComment,
}: CommentActions) => {
  const { user } = useAuth();
  const { fetchComments } = useComments();

  const notify = (message: string) => toast.success(message);

  function handleDelete() {
    let url = '/comments';
    let data: any = { comment_id: comment.id }
    let message = 'Deleted comment!';

    if (isReply) {
      url = '/replies';
      data = { reply_id: comment.id };
      message = 'Deleted reply!'
    }

    api
      .delete(url, {
        data,
      })
      .then(() => {
        fetchComments();
        notify(message);
      });
  }

  return (
    <>
      {comment.user.id === user?.id ? (
        <div className="flex items-center justify-center gap-2">
          <Button
            icon={DeleteIcon}
            text="Delete"
            variant="delete"
            onClick={handleDelete}
          />

          <Button icon={EditIcon} text="Edit" onClick={toggleEditComment} />
        </div>
      ) : (
        <Button icon={ReplyIcon} text="Reply" onClick={toggleReplyForm} />
      )}
    </>
  );
};
