import React, { useState } from 'react';
import api from './api';
import SearchStatus from './components/searchStatus';
import UsersList from './components/usersList';

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
  };

  const handleToggleBookmark = (userId) => {
    setUsers(users.map(user => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
      return user;
    }));
  };

  return (
    <>
      <SearchStatus length={users.length}/>
      {!!users.length
        && <UsersList
          users={users}
          onDeleteUser={handleDelete}
          onToggleBookmark={handleToggleBookmark}
        />
      }
    </>
  );
};

export default App;
