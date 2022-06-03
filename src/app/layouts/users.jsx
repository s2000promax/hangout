import React from 'react';
import UsersListPage from '../components/common/page/usersListPage';
import UserPage from '../components/common/page/userPage';
import { useParams } from 'react-router-dom';
import { UserProvider } from '../hooks/useUsers';
import EditUserPage from '../components/common/page/editUserPage';

const Users = () => {
  const { userId, edit } = useParams();
  return (
    <>
      <UserProvider>
        {!!userId
          ? (
              edit
                ? (<EditUserPage />)
                : (<UserPage id={userId}/>)
            )
          : (<UsersListPage/>)
        }
      </UserProvider>
    </>
  );
};

export default Users;
