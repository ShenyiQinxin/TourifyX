
import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import StartPage from './components/StartPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';

const oktaAuth = new OktaAuth(oktaConfig)
export default function App() {
  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  const customAuthHandler = () => {
    history.push('/login');
  }

  return (

    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/home'>
          <StartPage />
        </Route>

        <Route path='/login' render={() => <LoginWidget config={oktaConfig} />} />
        <Route path='/login/callback' component={LoginCallback} />
      </Switch>
    </Security>
  )
}
