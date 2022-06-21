import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from '../common/bookmark';
import Qualities from './qualities';
import Table from '../common/table';
import Profession from './profession';
import { Link } from 'react-router-dom';

const UsersTable = ({ users, onSort, selectedSort, onDeleteUser, onToggleBookMark }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => (
        <Link to={`/users/${user._id}`}>{user.name}</Link>
      )
    },
    qualities: {
      name: 'Качества',
      component: (user) => (
        <Qualities qualities={user.qualities}/>
      )
    },
    profession: {
      name: 'Профессия',
      component: (user) => (
        <Profession id={user.profession}/>
      )
    },
    completedMeetings: {
      path: 'completedMeetings',
      name: 'Встретился, раз'
    },
    rate: {
      path: 'rate',
      name: 'Оценка'
    },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark status={user.bookmark} onClick={() => onToggleBookMark(user._id)}/>
      )
    },
    deleteButton: {
      component: (user) => (
        <button
          className='btn btn-danger'
          onClick={() => onDeleteUser(user._id)}
        >
          delete
        </button>
      )
    }
  };
  return (
    <Table
      {...{
        onSort,
        selectedSort,
        columns,
        data: users
      }}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};

export default UsersTable;
