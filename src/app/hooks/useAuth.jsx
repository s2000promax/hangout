import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import localStorageService, { setTokens } from '../services/localStorage.service';
import Loader from '../components/ui/loader';
import { useHistory } from 'react-router-dom';

export const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

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

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async function singUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        image: `https://avatars.dicebear.com/api/avataaars/${(
          Math.random() + 1
        )
          .toString(36)
          .substring(7)}.svg`,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        ...rest
      });
      // console.log(data);
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
      const { content } = await userService.create(data);
      console.log('content', content);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  };

  async function updateAccount({ ...rest }) {
    // console.log(localStorageService.getAccessToken());
    console.log('rest', rest);
    const { email } = rest;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(
        url,
        {
          idToken: localStorageService.getAccessToken(),
          email,
          returnSecureToken: true
        }
      );
      console.log('upd', data.idToken);
      if (data.idToken) {
        setTokens(data);
      }
      await updateUser({
        ...rest
      });
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

  async function updateUser(data) {
    try {
      const { content } = await userService.update(data);
      console.log('content', content);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  };

  async function singIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      console.log('Login', data);
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        // Not good solving!!! Because we show current problem for lier person
        if (message === 'EMAIL_NOT_FOUND') {
          const errorObject = { email: 'Email is incorrect' };
          throw errorObject;
        }
        if (message === 'INVALID_PASSWORD') {
          const errorObject = { password: 'Password is incorrect' };
          throw errorObject;
        }
      }
    }
  };

  function logout() {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    history.push('/');
  };

  return (
    <AuthContext.Provider value={{ singUp, singIn, updateAccount, logout, currentUser }}>
      {!isLoading ? (children) : (<Loader type='1'/>)}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
