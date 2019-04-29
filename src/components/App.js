import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from  'semantic-ui-react';

import Navigation from './navigation';
import { SignIn } from './auth';
import { Account } from './user';
import { Projects } from './projects';

import { withAuthentication } from './session';
import { routes } from '../constants';
import '../css/App.css';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Container style={{ padding: '5em 0em' }}>
        <Route exact path={routes.SIGN_IN} component={SignIn} />
        <Route exact path={routes.ACCOUNT} component={Account} />
        <Route path={routes.PROJECTS} component={Projects} />
      </Container>
    </Router>
  )
}

export default withAuthentication(App);
