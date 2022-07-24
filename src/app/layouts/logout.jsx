import React, { useEffect } from 'react';
import Loader from '../components/ui/loader';
import { useDispatch } from 'react-redux';
import { logout } from '../store/users';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);
  return (
    <Loader type='1' />
  );
};

export default Logout;
