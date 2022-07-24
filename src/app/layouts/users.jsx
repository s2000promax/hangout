import React from 'react';
import UsersListPage from '../components/common/page/usersListPage';
import UserPage from '../components/common/page/userPage';
import { useParams } from 'react-router-dom';
import EditUserPage from '../components/common/page/editUserPage';
import UsersLoader from '../components/ui/hoc/usersLoader';

const Users = () => {
  const { userId, edit } = useParams();

  return (
    <>
      <UsersLoader>
        {!!userId
          ? (
              edit
                ? (<EditUserPage/>)
                : (<UserPage userId={userId}/>)
            )
          : (<UsersListPage/>)
        }
      </UsersLoader>
    </>
  );
};

export default Users;
