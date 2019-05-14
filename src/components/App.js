import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from  'semantic-ui-react';

import Navigation from './navigation';
import Home from './home';
import { SignUp } from './auth';
import { SignIn } from './auth';
import { ForgotPassword } from './auth';
import { Account } from './user';
import { Projects } from './projects';
import Admin from './admin';

import { withAuthentication } from './session';
import { routes } from '../constants';
import '../css/App.css';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Container style={{ padding: '5em 0em' }}>
        <Route exact path="/" component={Home} />
        <Route exact path={routes.SIGN_UP} component={SignUp} />
        <Route exact path={routes.SIGN_IN} component={SignIn} />
        <Route exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={routes.ACCOUNT} component={Account} />
        <Route path={routes.PROJECTS} component={Projects} />
        <Route path={routes.ADMIN} component={Admin} />
      </Container>
    </Router>
  )
}

export default withAuthentication(App);
