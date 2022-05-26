import React from 'react';
import PropTypes from 'prop-types';
import { formatDateLabel } from '../../../utils/utils';

const Comment = ({ users, commentsList, handleDelete }) => {
  return (
    <>
      {commentsList.map(comment => (
        <div className="bg-light card-body mb-3" key={comment._id}>
          <div className="row">
            <div className="col">
              <div className="d-flex flex-start ">
                <img
                  src={`https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                  )
                    .toString(36)
                    .substring(7)}.svg`}
                  className="rounded-circle shadow-1-strong me-3"
                  alt="avatar"
                  width="65"
                  height="65"
                />
                <div className="flex-grow-1 flex-shrink-1">
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-1 ">
                        {
                          users[users.findIndex(user => user.value === comment.userId)].label
                        }
                        &nbsp;
                        <span
                          className="small"
                        >
                        {formatDateLabel(comment.created_at)}
                      </span>
                      </p>
                      <button
                        className="btn btn-sm text-primary d-flex align-items-center"
                        data-id={comment._id}
                        onClick={handleDelete}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                    <p className="small mb-0">{comment.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
Comment.propTypes = {
  users: PropTypes.array,
  commentsList: PropTypes.array,
  handleDelete: PropTypes.func
};

export default Comment;
