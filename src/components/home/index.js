import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthUserContext } from '../session';
import { routes } from '../../constants';

const HomePage = () => {
  return(
    <div>
      <h1>Maple</h1>
    </div>
  )
}

const Home = () => {
  return(
    <AuthUserContext.Consumer>
      {authUser =>
        authUser
        ? <Redirect to={routes.PROJECTS} />
        : ( <HomePage /> )
      }
    </AuthUserContext.Consumer>
  )
}

export default Home;
