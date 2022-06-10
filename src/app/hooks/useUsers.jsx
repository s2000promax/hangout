import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Loader from '../components/ui/loader';
import userService from '../services/user.service';

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  function getUserById(id) {
    return users.find(user => user._id === id);
  };

  function errorCatcher(error) {
    console.log('###-Error:', error);
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <>
      <UserContext.Provider
        value={{ users, getUserById }}
      >
        {!isLoading ? children : <Loader type={'1'}/>}
      </UserContext.Provider>
    </>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
