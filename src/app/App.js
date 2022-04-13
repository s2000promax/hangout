import React, { useEffect, useState } from 'react';
import api from './api';
import UsersList from './components/usersList';

const App = () => {
  const [isData, setIsData] = useState(false); // Заглушка для Loader
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.users.fetchAll().then((dataOfUsers) => {
      if (Object.prototype.toString.call(dataOfUsers) === '[object Array]') {
        setUsers(dataOfUsers);
        setIsData(true);
      } else {
        setUsers([]); // Заглушка на случай, если придет Объект
      }
    });
  }, []);

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
      {!isData
        ? <div className='d-flex min-vh-100 min-vw-100'>
            <div className='d-flex m-lg-auto align-items-center'>
              <strong>Загрузка... </strong>
              <div className='spinner-border ms-auto' role='status' aria-hidden='true'> </div>
            </div>
          </div>
        : <div className='d-flex'>
            <UsersList
              users={users}
              onDeleteUser={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
      }
    </>
  );
};

export default App;
