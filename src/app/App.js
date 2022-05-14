import React from 'react';
import NavBar from './components/ui/navBar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';
import Error404 from './components/common/page/error404';
import EditUserPage from './components/common/page/editUserPage';
const App = () => {
  return (
    <>
      <NavBar />

      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/login/:type?' component={Login} />
        <Route path='/users/:userId/edit' exact component={EditUserPage} />
        <Route path='/users/:userId?' component={Users} />
        <Route path='/404' component={Error404} />
        <Redirect to='/404' />
      </Switch>

    </>
  );
};

export default App;
