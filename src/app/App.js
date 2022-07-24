import React from 'react';
import NavBar from './components/ui/navBar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';
import Error404 from './components/common/page/error404';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/protectedRoute';
import Logout from './layouts/logout';
import AppLoader from './components/ui/hoc/appLoader';

const App = () => {
  return (
    <>
      <AppLoader>
      <NavBar/>
          <Switch>
            <ProtectedRoute path='/users/:userId?/:edit?/' component={Users} />
            <Route path='/login/:type?' component={Login} />
            <Route path='/404' component={Error404} />
            <Route path='/' exact component={Main} />
            <Route path='/logout' component={Logout} />
            <Redirect to='/'/>
          </Switch>
      </AppLoader>

      <ToastContainer/>
    </>
  );
};

export default App;
