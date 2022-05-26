import React, { useEffect, useState } from 'react';
import api from '../../../api/';
import Comment from './comment';
import SelectField from '../form/selectField';
import TextareaField from '../form/textareaField';
import PropTypes from 'prop-types';
import { validator } from '../../../utils/validator';
import _ from 'lodash';

const CommentsList = ({ userId, sortBy }) => {
  const [update, setUpdate] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [user, setUser] = useState({
    name: '',
    content: ''
  });
  const [errors, setErrors] = useState({});
  const isValid = !Object.keys(errors).length;

  useEffect(() => {
    api.users.fetchAll().then(usersData => {
      setUsersList(
        usersData.map((data) => ({
          label: data.name,
          value: data._id
        }))
      );
    });
  }, []);

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then(commentsData => {
      const sortedCommentsList = _.orderBy(commentsData, [sortBy.path], [sortBy.order]);
      setCommentsList(sortedCommentsList);
      if (update) {
        setUpdate(!update);
      };
    });
  }, [update, sortBy]);

  useEffect(() => {
    validate();
  }, [user]);

  const validatorConfig = {
    name: {
      isRequired: { message: 'Name is required' }
    },
    content: {
      isRequired: { message: 'Email is required' },
      min: { message: 'Name must have 3 symbols more', value: 3 }
    }
  };

  const validate = () => {
    const errors = validator(user, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleChange = (target) => {
    // console.log('target', target);
    setUser(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleDelete = (event) => {
    const { target } = event;
    console.log(target.parentNode.dataset.id);
    api.comments.remove(target.parentNode.dataset.id).then(data => {
      console.log('remove:', data);
      setUpdate(!update);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser({
      name: '',
      content: '',
      value: ''
    });

    const commentData = {
      pageId: userId,
      userId: user.name,
      content: user.content
    };
    api.comments.add(commentData).then(data => {
      console.log('add:', data);
      setUpdate(!update);
    });
  };
  return (
    <>
      <div className='card mb-2'>
        {' '}
        <div className='card-body '>
          <h2>New comment</h2>
          <form onSubmit={handleSubmit}>
            <SelectField
              name='name'
              value={user.name}
              onChange={handleChange}
              defaultOption='Choose user...'
              options={usersList}
              error={errors.name}
            />
            <TextareaField
              label='Comment'
              name='content'
              rows='3'
              value={user.content}
              onChange={handleChange}
              error={errors.content}

            />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className='btn btn-primary me-md-2"'
                type='submit'
                disabled={!isValid}
              >Publish
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='card mb-3'>
        <div className='card-body '>
          <h2>Comments</h2>
          <hr/>
          {!!commentsList.length && !!usersList.length
            && <Comment
              users={usersList}
              commentsList={commentsList}
              handleDelete={handleDelete}
            />}
        </div>
      </div>
    </>
  );
};
CommentsList.propTypes = {
  userId: PropTypes.string,
  sortBy: PropTypes.object
};

export default CommentsList;
