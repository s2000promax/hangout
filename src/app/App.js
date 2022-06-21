import React from 'react';
import NavBar from './components/ui/navBar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';
import Error404 from './components/common/page/error404';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';
import { QualityProvider } from './hooks/useQuality';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import Logout from './layouts/logout';

const App = () => {
  return (
    <>
      <AuthProvider>
      <NavBar/>
      <ProfessionProvider>
        <QualityProvider>
          <Switch>
            <ProtectedRoute path='/users/:userId?/:edit?/' component={Users} />
            <Route path='/login/:type?' component={Login} />
            <Route path='/404' component={Error404} />
            <Route path='/' exact component={Main} />
            <Route path='/logout' component={Logout} />
            <Redirect to='/'/>
          </Switch>
        </QualityProvider>
      </ProfessionProvider>
      </AuthProvider>

      <ToastContainer/>
    </>
  );
};

export default App;
