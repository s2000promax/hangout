import React from 'react';
import UsersList from '../components/usersList';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/userInfo';

const Users = () => {
  const { userId } = useParams();
  return (
    <>
      {!!userId
        ? <UserInfo id={userId} />
        : <UsersList />
      }
    </>
  );
};

export default Users;
