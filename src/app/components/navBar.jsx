import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='nav'>
      <Link className='nav-link active' aria-current='page' to='/' >Main</Link>
      <Link className='nav-link' to='/login'>Login</Link>
      <Link className='nav-link' to='/users'>Users</Link>
    </nav>
  );
};

export default NavBar;
