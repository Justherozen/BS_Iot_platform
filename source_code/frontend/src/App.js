import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation,
  Switch,
} from 'react-router-dom';
import Signin from './pages/signin/Signin';
import Signup from './pages/signin/Signup';
import Dashboard  from './pages/homecomp/Dashboard';
import EditPass from './pages/signin/EditPass';
import myHelp from './pages/help/Help';
// process-G
import Newdevice from './pages/homecomp/Newdevice';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Dashboard} />
        <Route path="/newdevice" component={Newdevice} />
        <Route path="/editpass" component={EditPass} />
        <Route path="/help" component={myHelp} />
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

function NoMatch() {
  const location = useLocation();
  return (
    <div>
      <h2>
        <code>No match for path:</code>
      </h2>
      <h1>
        <code>{location.pathname}</code>
      </h1>
      {[
        'Check your url:',
        '- for signin, use /signin',
        '- for signup, use /signup',
        '- for home, use /home',
        '- / will be redirected to /signin',
      ].map(msg => (
        // eslint-disable-next-line react/jsx-key
        <h3>
          <code>{msg}</code>
        </h3>
      ))}
    </div>
  );
}