import React from 'react';
import UsersListPage from '../components/common/page/usersListPage';
import UserPage from '../components/common/page/userPage';
import { useParams } from 'react-router-dom';

const Users = () => {
  const { userId } = useParams();
  return (
    <>
      {!!userId
        ? <UserPage id={userId} />
        : <UsersListPage />
      }
    </>
  );
};

export default Users;
