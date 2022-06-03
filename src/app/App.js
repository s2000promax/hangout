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

const App = () => {
  return (
    <>
      <NavBar/>
      <ProfessionProvider>
        <QualityProvider>
          <Switch>
            <Route path='/users/:userId?/:edit?/' component={Users}/>
            <Route path='/login/:type?' component={Login}/>
            <Route path='/404' component={Error404}/>
            <Route path='/' exact component={Main}/>
            <Redirect to='/'/>
          </Switch>
        </QualityProvider>
      </ProfessionProvider>

      <ToastContainer/>

    </>
  );
};

export default App;
