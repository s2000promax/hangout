import { orderBy } from 'lodash';
import React, { useEffect } from 'react';
import CommentsList, { AddCommentForm } from '../common/comments';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewComment,
  deleteCurrentComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from '../../store/comments';
import Loader from './loader';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../../store/users';
import { nanoid } from 'nanoid';

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(getComments());
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId);

  const handleSubmit = (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId
    };
    dispatch(createNewComment(comment));
  };
  const handleRemoveComment = (id) => {
    dispatch(deleteCurrentComment(id));
  };
  const sortedComments = orderBy(comments, ['created_at'], ['desc']);
  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit}/>
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr/>
            {!isLoading
              ? <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
              : <Loader type='1' /> }
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
