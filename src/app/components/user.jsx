import React from 'react';
import Qualities from './qualities';
import Bookmark from './bookmark';
import PropTypes from 'prop-types';

const User = ({ users, ...rest }) => {
  const { onDeleteUser } = rest;
  return (
    <>
      {users.map(user => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>
            <Qualities
              color={user.qualities.color}
              name={user.qualities.name}
              id={user.qualities._id}
            />
          </td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{`${user.rate}/5`}</td>
          <td>
            <Bookmark
              status={user.bookmark}
              userId={user._id}
              {...rest}
            />
          </td>
          <td>
            <button
              className='btn btn-danger'
              onClick={() => onDeleteUser(user._id)}
            >
              delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

User.propTypes = {
  users: PropTypes.array.isRequired
};

export default User;
