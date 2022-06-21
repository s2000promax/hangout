import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/ui/loader';

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);
  return (
    <Loader type='1' />
  );
};

export default Logout;
