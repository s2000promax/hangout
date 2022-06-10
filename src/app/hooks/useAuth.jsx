import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { setTokens } from '../services/localStorage.service';

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    console.log('###-Error:', error);
    const { message } = error.response.data;
    setError(message);
  };

  async function singUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        ...rest
      });
      console.log(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = { email: 'User already exists' };
          throw errorObject;
        }
      }
    }
  };

  async function createUser(data) {
    try {
      const { content } = userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  };
  return (
    <AuthContext.Provider value={{ singUp, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
